import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { useEffectOnce } from "../hooks";
import RoutesEnum from "../routes/type-defs/RoutesEnum";
import { ListProjectsServiceResponse } from "../services/interfaces";

import { FormattedProject } from "../services/type-defs/FormattedProject";
import {
  Issue,
  IssueGroup,
  ParticipantRoleValue,
  Project,
} from "../services/type-defs/Project";
import { useAPIService } from "./APIServiceContext";
import { useDateFormatter } from "./DateFormatterContext";
import { useSession } from "./SessionContext";
import { useSocket } from "./SocketContext";

type ProjectsContextData = {
  projects: FormattedProject[];
  loading: boolean;
  fetchProjects: () => Promise<void>;
  getProjectById: (id: string) => FormattedProject | undefined;
  getLoggedInUserRoleInProject: (
    project: Project
  ) => ParticipantRoleValue | null;
};

export const ProjectsContext = createContext({} as ProjectsContextData);

type ProjectsProviderProps = {
  children: React.ReactNode;
};

export function ProjectsProvider({
  children,
}: ProjectsProviderProps): React.ReactElement {
  const history = useHistory();
  const { isReadyForAuthRequests, listProjectsService } = useAPIService();
  const { formatToFullDate } = useDateFormatter();
  const { session } = useSession();
  const { socket } = useSocket();

  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<FormattedProject[]>([]);

  const getOwnerParticipant = useCallback(
    (participants: ListProjectsServiceResponse["participants"]) => {
      const participant = participants.find(
        (p) => p.role.name.value === "owner"
      );

      if (!participant) return "";

      return participant.account.name;
    },
    []
  );

  const getProgressPercentage = useCallback((project: Project): number => {
    let totalIssues = 0;
    let completedIssues = 0;

    project.issueGroups.forEach((issueGroup: IssueGroup) => {
      issueGroup.issues.forEach((issue: Issue) => {
        totalIssues += 1;
        if (issue.completed) completedIssues += 1;
      });
    });

    return Math.round((100 * completedIssues) / totalIssues) || 0;
  }, []);

  const getFormattedDate = useCallback(
    (date: string | null) => (date ? formatToFullDate(date) : ""),
    [formatToFullDate]
  );

  const formatProjects = useCallback(
    (rawProjects: ListProjectsServiceResponse[]): FormattedProject[] =>
      rawProjects.map((p) => ({
        ...p,
        ownerName: getOwnerParticipant(p.participants),
        progressPercentage: getProgressPercentage(p),
        beginsAtFullDate: getFormattedDate(p.beginsAt),
        finishesAtFullDate: getFormattedDate(p.finishesAt),
        issueGroups: p.issueGroups.map((ig) => ({
          ...ig,
          issues: ig.issues.map((i) => ({
            ...i,
            createdAtFullDate: getFormattedDate(i.createdAt),
            expiresAtFullDate: getFormattedDate(i.expiresAt),
          })),
        })),
      })),
    [getOwnerParticipant, getFormattedDate, getProgressPercentage]
  );

  const updateProjectsState = useCallback(async () => {
    setLoading(true);

    const response = await listProjectsService.list();

    if (response.data) {
      const formattedProjects = formatProjects(response.data);
      setProjects(formattedProjects);
    }

    setLoading(false);
  }, [listProjectsService, formatProjects]);

  useEffectOnce(() => {
    socket.on("loadProject", (project) => {
      const formattedProjects = formatProjects([project]);
      setProjects((prev) =>
        prev.map((p) => {
          if (p.projectId === project.projectId) return formattedProjects[0];

          return p;
        })
      );
    });

    socket.on("removeProject", (projectId) => {
      history.push(RoutesEnum.PROJECTS);
      setProjects(projects.filter((p) => p.projectId !== projectId));
    });
  }, isReadyForAuthRequests);

  useEffect(() => {
    if (isReadyForAuthRequests) {
      updateProjectsState();
    }
  }, [isReadyForAuthRequests, updateProjectsState]); // adding updateProjectsState to the deps array is going to make it run forever

  function getProjectById(id: string): FormattedProject | undefined {
    return projects.find((p) => p.projectId === id);
  }

  function getLoggedInUserRoleInProject(
    project: Project
  ): ParticipantRoleValue | null {
    const participant = project.participants.find(
      (p) => p.account.email === session!.email
    );

    if (!participant) return null;

    return participant.role.name.value;
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        fetchProjects: updateProjectsState,
        getProjectById,
        getLoggedInUserRoleInProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects(): ProjectsContextData {
  return useContext(ProjectsContext);
}
