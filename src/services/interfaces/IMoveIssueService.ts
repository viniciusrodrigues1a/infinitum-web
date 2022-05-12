import { APIResponse } from "../type-defs/APIResponse";

export type MoveIssueServiceRequest = {
  issueId: string;
  moveToIssueGroupId: string;
  orderBefore?: string;
  orderAfter?: string;
};

export interface IMoveIssueService {
  moveIssue(data: MoveIssueServiceRequest): Promise<APIResponse<null>>;
}
