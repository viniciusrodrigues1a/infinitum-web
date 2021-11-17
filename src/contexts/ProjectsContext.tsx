import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ListProjectsServiceResponse } from "../services/interfaces";

import { FormattedProject } from "../services/type-defs/FormattedProject";
import { Issue, IssueGroup, Project } from "../services/type-defs/Project";
import { useAPIService } from "./APIServiceContext";
import { useDateFormatter } from "./DateFormatterContext";

type ProjectsContextData = {
  projects: FormattedProject[];
  loading: boolean;
  fetchProjects: () => Promise<void>;
  getProjectById: (id: string) => FormattedProject | undefined;
};

export const ProjectsContext = createContext({} as ProjectsContextData);

type ProjectsProviderProps = {
  children: React.ReactNode;
};

export function ProjectsProvider({
  children,
}: ProjectsProviderProps): React.ReactElement {
  const { isReadyForAuthRequests } = useAPIService();
  const { listProjectsService } = useAPIService();
  const { formatToFullDate } = useDateFormatter();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<FormattedProject[]>([]);

  const getOwnerParticipant = useCallback(
    (participants: ListProjectsServiceResponse["participants"]) => {
      const owner = participants.find((p) => p.projectRoleName === "owner");

      if (!owner) return "";

      return owner.name;
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

    return Math.round((100 * completedIssues) / totalIssues);
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
    if (projects.length === 0) setLoading(true);

    const response = await listProjectsService.list();

    if (response.data) {
      const formattedProjects = formatProjects(response.data);
      setProjects(formattedProjects);
    }

    setLoading(false);
  }, [listProjectsService, formatProjects, projects]);

  useEffect(() => {
    if (isReadyForAuthRequests) {
      updateProjectsState();
    }
  }, [isReadyForAuthRequests]); // adding updateProjectsState to the deps array is going to make it run forever

  function getProjectById(id: string): FormattedProject | undefined {
    return projects.find((p) => p.projectId === id);
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        fetchProjects: updateProjectsState,
        getProjectById,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects(): ProjectsContextData {
  return useContext(ProjectsContext);
}
