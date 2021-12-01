import { APIResponse } from "../type-defs/APIResponse";

export type DeleteIssueServiceRequest = {
  issueId: string;
};

export interface IDeleteIssueService {
  deleteIssue(data: DeleteIssueServiceRequest): Promise<APIResponse<null>>;
}
