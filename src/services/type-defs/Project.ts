export type Issue = {
  issueId: string;
  title: string;
  description: string;
  expiresAt: string | null;
  createdAt: string | null;
};

export type IssueGroup = {
  issueGroupId: string;
  title: string;
  issues: Issue[];
};

export type Project = {
  projectId: string;
  name: string;
  description: string;
  beginsAt: string | null;
  finishesAt: string | null;
  createdAt: string;
  archived: boolean | null;
  participants: {
    id: string;
    name: string;
    email: string;
    projectRoleName: string;
  }[];
  issueGroups: IssueGroup[];
};
