import { APIResponse } from "../type-defs/APIResponse";

export type UpdateIssueGroupFinalStatusServiceRequest = {
  issueGroupId: string;
  newIsFinal: boolean;
};

export interface IUpdateIssueGroupFinalStatusService {
  updateIssueGroupFinalStatus(
    data: UpdateIssueGroupFinalStatusServiceRequest
  ): Promise<APIResponse<null>>;
}
