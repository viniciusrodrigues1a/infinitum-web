import { APIResponse } from "../type-defs/APIResponse";

export type ListProjectsServiceResponse = {
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

export interface IListProjectsService {
  list(): Promise<APIResponse<ListProjectsServiceResponse[]>>;
}
