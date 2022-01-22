import { APIResponse } from "../type-defs/APIResponse";

export type UpdateIssueGroupColorServiceRequest = {
  issueGroupId: string;
  newColor: string;
};

export interface IUpdateIssueGroupColorService {
  updateIssueGroupColor(
    data: UpdateIssueGroupColorServiceRequest
  ): Promise<APIResponse<null>>;
}
