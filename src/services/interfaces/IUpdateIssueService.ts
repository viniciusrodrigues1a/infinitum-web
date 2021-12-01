import { APIResponse } from "../type-defs/APIResponse";

export type UpdateIssueServiceRequest = Partial<{
  issueId: string;
  newTitle: string;
  newDescription: string;
  newCompleted: string;
  newAssignedToEmail: string;
}>;

export interface IUpdateIssueService {
  updateIssue(data: UpdateIssueServiceRequest): Promise<APIResponse<null>>;
}
