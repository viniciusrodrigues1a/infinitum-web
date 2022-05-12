import { APIResponse } from "../type-defs/APIResponse";

export type DeleteIssueGroupServiceRequest = {
  issueGroupId: string;
};

export interface IDeleteIssueGroupService {
  deleteIssueGroup(
    data: DeleteIssueGroupServiceRequest
  ): Promise<APIResponse<null>>;
}
