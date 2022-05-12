import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import {
  CreateIssueGroupServiceRequest,
  CreateIssueServiceRequest,
  MoveIssueServiceRequest,
} from "../services/interfaces";
import { FormattedIssue } from "../services/type-defs/FormattedProject";
import showToast from "../utils/showToast";
import { useAPIService } from "./APIServiceContext";
import { useProjects } from "./ProjectsContext";

type ViewsContextData = {
  issueBeingUpdated: FormattedIssue | null;
  setIssueBeingUpdated: Dispatch<SetStateAction<FormattedIssue | null>>;
  issueGroupIdBeingUpdated: string | null;
  setIssueGroupIdBeingUpdated: Dispatch<SetStateAction<string | null>>;
  isCreatingNewIssueForIssueGroupId: string | null;
  setIsCreatingNewIssueForIssueGroupId: Dispatch<SetStateAction<string | null>>;
  isCreatingNewIssueGroup: boolean;
  setIsCreatingNewIssueGroup: Dispatch<SetStateAction<boolean>>;
  createIssue: (request: CreateIssueServiceRequest) => Promise<void>;
  createIssueGroup: (request: CreateIssueGroupServiceRequest) => Promise<void>;
  moveIssue: (request: MoveIssueServiceRequest) => Promise<void>;
  updateIssueCompletedStatus: (id: string, status: boolean) => Promise<void>;
  updateIssueGroupFinalStatus: (isFinal: boolean) => Promise<void>;
  updateIssueGroupColor: (color: string) => Promise<void>;
  deleteIssueGroup: (issueGroupId: string) => Promise<void>;
};

type ViewsProviderProps = {
  children: React.ReactNode;
};

const ViewsContext = createContext({} as ViewsContextData);

export function ViewsProvider({
  children,
}: ViewsProviderProps): React.ReactElement {
  const {
    createIssueService,
    createIssueGroupService,
    updateIssueService,
    updateIssueGroupFinalStatusService,
    moveIssueService,
    updateIssueGroupColorService,
    deleteIssueGroupService,
  } = useAPIService();
  const { fetchProjects } = useProjects();

  const [issueBeingUpdated, setIssueBeingUpdated] =
    useState<FormattedIssue | null>(null);
  const [issueGroupIdBeingUpdated, setIssueGroupIdBeingUpdated] = useState<
    string | null
  >(null);
  const [
    isCreatingNewIssueForIssueGroupId,
    setIsCreatingNewIssueForIssueGroupId,
  ] = useState<string | null>(null);
  const [isCreatingNewIssueGroup, setIsCreatingNewIssueGroup] =
    useState<boolean>(false);

  const createIssue = useCallback(
    async (request: CreateIssueServiceRequest) => {
      const response = await createIssueService.createIssue(request);

      const toastMsg = response.userFriendlyMessage;
      if (toastMsg) showToast(toastMsg, response.error);
      if (!response.error) {
        await fetchProjects();
      }
    },
    [createIssueService, fetchProjects]
  );

  const createIssueGroup = useCallback(
    async (request: CreateIssueGroupServiceRequest) => {
      const response = await createIssueGroupService.createIssueGroup(request);

      const toastMsg = response.userFriendlyMessage;
      if (toastMsg) showToast(toastMsg, response.error);
      if (!response.error) {
        await fetchProjects();
      }
    },
    [createIssueGroupService, fetchProjects]
  );

  const updateIssueCompletedStatus = useCallback(
    async (issueId: string, currentCompletedStatus: boolean) => {
      await updateIssueService.updateIssue({
        issueId,
        newAssignedToEmail: "undefined",
        newCompleted: !currentCompletedStatus,
      });

      await fetchProjects();
    },
    [fetchProjects, updateIssueService]
  );

  const updateIssueGroupFinalStatus = useCallback(
    async (isFinal: boolean) => {
      if (issueGroupIdBeingUpdated) {
        await updateIssueGroupFinalStatusService.updateIssueGroupFinalStatus({
          issueGroupId: issueGroupIdBeingUpdated,
          newIsFinal: isFinal,
        });

        setIssueGroupIdBeingUpdated(null);
        await fetchProjects();
      }
    },
    [
      fetchProjects,
      issueGroupIdBeingUpdated,
      updateIssueGroupFinalStatusService,
    ]
  );

  const updateIssueGroupColor = useCallback(
    async (color: string) => {
      if (issueGroupIdBeingUpdated) {
        await updateIssueGroupColorService.updateIssueGroupColor({
          issueGroupId: issueGroupIdBeingUpdated,
          newColor: color,
        });

        setIssueGroupIdBeingUpdated(null);
        await fetchProjects();
      }
    },
    [fetchProjects, issueGroupIdBeingUpdated, updateIssueGroupColorService]
  );

  const moveIssue = useCallback(
    async (request) => {
      const response = await moveIssueService.moveIssue(request);

      const toastMsg = response.userFriendlyMessage;
      if (toastMsg) showToast(toastMsg, response.error);
      if (!response.error) {
        await fetchProjects();
      }
    },
    [fetchProjects, moveIssueService]
  );

  const deleteIssueGroup = useCallback(
    async (issueGroupId: string) => {
      const response = await deleteIssueGroupService.deleteIssueGroup({
        issueGroupId,
      });

      if (!response.error) {
        await fetchProjects();
      }
    },
    [fetchProjects, deleteIssueGroupService]
  );

  return (
    <ViewsContext.Provider
      value={{
        issueBeingUpdated,
        setIssueBeingUpdated,
        issueGroupIdBeingUpdated,
        setIssueGroupIdBeingUpdated,
        isCreatingNewIssueForIssueGroupId,
        setIsCreatingNewIssueForIssueGroupId,
        isCreatingNewIssueGroup,
        setIsCreatingNewIssueGroup,
        createIssue,
        createIssueGroup,
        moveIssue,
        updateIssueCompletedStatus,
        updateIssueGroupFinalStatus,
        updateIssueGroupColor,
        deleteIssueGroup,
      }}
    >
      {children}
    </ViewsContext.Provider>
  );
}

export function useViewsState(): ViewsContextData {
  return useContext(ViewsContext);
}
