import { APIResponse } from "../type-defs/APIResponse";

export type CreateIssueServiceRequest = Partial<{
  issueGroupId: string;
  title: string;
  description: string;
  expiresAt: Date;
}>;

export interface ICreateIssueService {
  createIssue(data: CreateIssueServiceRequest): Promise<APIResponse<null>>;
}
