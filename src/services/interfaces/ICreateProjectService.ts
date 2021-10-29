import { APIResponse } from "../type-defs/APIResponse";

export type CreateProjectServiceRequest = Partial<{
  name: string;
  description: string;
  beginsAt: Date;
  finishesAt: Date;
}>;

export interface ICreateProjectService {
  createProject(data: CreateProjectServiceRequest): Promise<APIResponse<null>>;
}
