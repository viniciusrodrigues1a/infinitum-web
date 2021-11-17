import { APIResponse } from "../type-defs/APIResponse";

export type UpdateRoleServiceRequest = Partial<{
  projectId: string;
  accountEmail: string;
  roleName: string;
}>;

export interface IUpdateRoleService {
  updateRole(data: UpdateRoleServiceRequest): Promise<APIResponse<null>>;
}
