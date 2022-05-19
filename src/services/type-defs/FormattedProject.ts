import { Issue, IssueGroup, Participant, Project } from "./Project";

export type FormattedIssue = Issue & {
  assignedToParticipant: Participant | undefined;
  createdAtFullDate: string;
  expiresAtFullDate: string;
  order: string;
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
