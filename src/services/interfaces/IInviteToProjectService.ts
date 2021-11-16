import { APIResponse } from "../type-defs/APIResponse";

export type InviteToProjectServiceRequest = Partial<{
  roleName: string;
  projectId: string;
  projectName: string;
  accountEmail: string;
}>;

export interface IInviteToProjectService {
  inviteToProject(
    data: InviteToProjectServiceRequest
  ): Promise<APIResponse<null>>;
}
