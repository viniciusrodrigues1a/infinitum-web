import { APIResponse } from "../type-defs/APIResponse";
import { Issue } from "../type-defs/Project";

type IssueWithProjectName = Issue & { projectName: string };

export type GetIssuesOverviewServiceResponse = {
  expiredIssues: {
    amount: number;
    issues: IssueWithProjectName[];
  };
  issuesForToday: {
    percentageCompleted: number;
    issues: IssueWithProjectName[];
  };
  allIssues: {
    percentageCompleted: number;
    leftUncompleted: number;
    total: number;
    issues: Issue[];
  };
  issuesWeeklyOverview: {
    date: string;
    value: number;
  }[];
  issuesMonthlyOverview: {
    date: string;
    value: number;
  }[];
};

export interface IGetIssuesOverviewService {
  getIssuesOverview(): Promise<APIResponse<GetIssuesOverviewServiceResponse>>;
}
