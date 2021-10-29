import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import RoutesEnum from "../routes/type-defs/RoutesEnum";
import { ListProjectsServiceResponse } from "../services/interfaces";

import { FormattedProject } from "../services/type-defs/FormattedProject";
import { useAPIService } from "./APIServiceContext";
import { useDateFormatter } from "./DateFormatterContext";

type ProjectsContextData = {
  projects: FormattedProject[];
  fetchProjects: () => Promise<void>;
};

export const ProjectsContext = createContext({} as ProjectsContextData);

type ProjectsProviderProps = {
  children: React.ReactNode;
};

export function ProjectsProvider({
  children,
}: ProjectsProviderProps): React.ReactElement {
  const location = useLocation();
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

  const getFormattedDate = useCallback(
    (date: string | null) => (date ? formatToFullDate(date) : ""),
    [formatToFullDate]
  );

  const formatProjects = useCallback(
    (rawProjects: ListProjectsServiceResponse[]): FormattedProject[] =>
      rawProjects.map((p) => ({
        ...p,
        ownerName: getOwnerParticipant(p.participants),
        beginsAtFullDate: getFormattedDate(p.beginsAt),
        finishesAtFullDate: getFormattedDate(p.finishesAt),
      })),
    [getOwnerParticipant, getFormattedDate]
  );

  const updateProjectsState = useCallback(async () => {
    const projects = await listProjectsService.list();

    if (projects.data) {
      const formattedProjects = formatProjects(projects.data);
      setProjects(formattedProjects);
    }
  }, [listProjectsService, formatProjects]);

  useEffect(() => {
    if (location.pathname === RoutesEnum.PROJECTS) updateProjectsState();
  }, [location, updateProjectsState]);

  return (
    <ProjectsContext.Provider
      value={{ projects, fetchProjects: updateProjectsState }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects(): ProjectsContextData {
  return useContext(ProjectsContext);
}
