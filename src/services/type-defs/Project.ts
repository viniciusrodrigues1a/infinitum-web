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
};
