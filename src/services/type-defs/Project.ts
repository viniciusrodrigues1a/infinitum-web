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
  shouldUpdateIssuesToCompleted: boolean;
  color: string;
};

export type ParticipantRoleValue = "owner" | "admin" | "member" | "espectator";

export type Participant = {
  account: {
    name: string;
    email: string;
    image: string;
  };
  role: {
    name: {
      value: ParticipantRoleValue;
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
  pendingInvitations: { name: string; email: string; image: string }[];
};
