export type Issue = {
  issueId: string;
  title: string;
  description: string;
  expiresAt: string | null;
  createdAt: string | null;
  completed: boolean;
  assignedToEmail: string;
};

export type IssueGroup = {
  issueGroupId: string;
  title: string;
  issues: Issue[];
};

export type Participant = {
  account: {
    name: string;
    email: string;
  };
  role: {
    name: {
      value: string;
    };
  };
};

export type Project = {
  projectId: string;
  name: string;
  description: string;
  beginsAt: string | null;
  finishesAt: string | null;
  createdAt: string;
  archived: boolean | null;
  participants: Participant[];
  issueGroups: IssueGroup[];
};
