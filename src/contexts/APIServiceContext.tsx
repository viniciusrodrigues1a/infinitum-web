import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../services/api";
import CreateIssueGroupService from "../services/CreateIssueGroupService";
import CreateIssueService from "../services/CreateIssueService";
import CreateProjectService from "../services/CreateProjectService";
import DeleteProjectService from "../services/DeleteProjectService";
import FindProjectImageService from "../services/FindProjectImageService";
import GetIssuesOverviewService from "../services/GetIssuesOverviewService";
import {
  ICreateIssueGroupService,
  ICreateProjectService,
  IFindProjectImageService,
  IGetIssuesOverviewService,
  IInviteToProjectService,
  IKickParticipantService,
  IListProjectsService,
  ILoginService,
  IRegisterService,
  IUpdateProjectImageService,
  IUpdateRoleService,
} from "../services/interfaces";
import { ICreateIssueService } from "../services/interfaces/ICreateIssueService";
import { IDeleteProjectService } from "../services/interfaces/IDeleteProjectService";
import { IUpdateProjectService } from "../services/interfaces/IUpdateProjectService";
import InviteToProjectService from "../services/InviteToProjectService";
import KickParticipantService from "../services/KickParticipantService";
import ListProjectsService from "../services/ListProjectsService";
import LoginService from "../services/LoginService";
import RegisterService from "../services/RegisterService";
import UpdateProjectImageService from "../services/UpdateProjectImageService";
import UpdateProjectService from "../services/UpdateProjectService";
import UpdateRoleService from "../services/UpdateRoleService";
import { useLanguage } from "./LanguageContext";
import { useSession } from "./SessionContext";

type APIServiceContextData = {
  isReadyForAuthRequests: boolean;
  loginService: ILoginService;
  registerService: IRegisterService;
  listProjectsService: IListProjectsService;
  createProjectService: ICreateProjectService;
  createIssueService: ICreateIssueService;
  updateProjectService: IUpdateProjectService;
  deleteProjectService: IDeleteProjectService;
  createIssueGroupService: ICreateIssueGroupService;
  getIssuesOverviewService: IGetIssuesOverviewService;
  kickParticipantService: IKickParticipantService;
  inviteToProjectService: IInviteToProjectService;
  updateRoleService: IUpdateRoleService;
  updateProjectImageService: IUpdateProjectImageService;
  findProjectImageService: IFindProjectImageService;
};

type APIServiceProviderProps = {
  children: React.ReactElement;
};

export const APIServiceContext = createContext({} as APIServiceContextData);

export const APIServiceProvider = ({
  children,
}: APIServiceProviderProps): React.ReactElement => {
  const { sessionToken, isSignedIn } = useSession();
  const { isoCode, language } = useLanguage();
  const [isReadyForAuthRequests, setIsReadyForAuthRequests] = useState(false);

  const services = useMemo(() => {
    const lang = language.libs.axios;

    return {
      loginService: new LoginService(api, lang),
      registerService: new RegisterService(api, lang),
      listProjectsService: new ListProjectsService(api, lang),
      createProjectService: new CreateProjectService(api, lang),
      createIssueService: new CreateIssueService(api, lang),
      updateProjectService: new UpdateProjectService(api, lang),
      deleteProjectService: new DeleteProjectService(api, lang),
      createIssueGroupService: new CreateIssueGroupService(api, lang),
      getIssuesOverviewService: new GetIssuesOverviewService(api, lang),
      kickParticipantService: new KickParticipantService(api, lang),
      inviteToProjectService: new InviteToProjectService(api, lang),
      updateRoleService: new UpdateRoleService(api, lang),
      updateProjectImageService: new UpdateProjectImageService(api),
      findProjectImageService: new FindProjectImageService(api),
    } as Omit<APIServiceContextData, "isReadyForAuthRequests">;
  }, [language]);

  useEffect(() => {
    api.defaults.headers.common["Accept-Language"] = isoCode;
  }, [isoCode]);

  useEffect(() => {
    if (isSignedIn()) {
      api.defaults.headers.common.Authorization = `Bearer ${sessionToken}`;
      setIsReadyForAuthRequests(true);
    } else {
      setIsReadyForAuthRequests(false);
    }
  }, [sessionToken, isSignedIn]);

  return (
    <APIServiceContext.Provider value={{ ...services, isReadyForAuthRequests }}>
      {children}
    </APIServiceContext.Provider>
  );
};

export function useAPIService(): APIServiceContextData {
  return useContext(APIServiceContext);
}
