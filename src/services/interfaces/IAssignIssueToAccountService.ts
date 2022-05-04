import { APIResponse } from "../type-defs/APIResponse";

export type AssignIssueToAccountServiceRequest = Partial<{
  issueId: string;
  assignedToEmail: string | null;
}>;

export interface IAssignIssueToAccountService {
  assignIssueToAccount(
    data: AssignIssueToAccountServiceRequest
  ): Promise<APIResponse<null>>;
}
