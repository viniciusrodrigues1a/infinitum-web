import { Issue, IssueGroup, Project } from "./Project";

export type FormattedIssue = Issue & {
  createdAtFullDate: string;
  expiresAtFullDate: string;
};

export type FormattedIssueGroup = Omit<IssueGroup, "issues"> & {
  issues: FormattedIssue[];
};

export type FormattedProject = Project & {
  ownerName: string;
  progressPercentage: number;
  beginsAtFullDate: string;
  finishesAtFullDate: string;
  issueGroups: FormattedIssueGroup[];
};
