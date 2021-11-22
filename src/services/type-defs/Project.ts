export type Issue = {
  issueId: string;
  title: string;
  description: string;
  expiresAt: string | null;
  createdAt: string | null;
  completed: boolean;
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
    account: {
      name: string;
      email: string;
    };
    role: {
      name: {
        value: string;
      };
    };
  }[];
  issueGroups: IssueGroup[];
};
