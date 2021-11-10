import { APIResponse } from "../type-defs/APIResponse";

export type CreateIssueGroupServiceRequest = Partial<{
  projectId: string;
  title: string;
}>;

export interface ICreateIssueGroupService {
  createIssueGroup(
    data: CreateIssueGroupServiceRequest
  ): Promise<APIResponse<null>>;
}
