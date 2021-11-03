import { APIResponse } from "../type-defs/APIResponse";
import { CreateProjectServiceRequest } from "./ICreateProjectService";

export type UpdateProjectServiceRequest = CreateProjectServiceRequest & {
  projectId: string;
};

export interface IUpdateProjectService {
  updateProject(data: UpdateProjectServiceRequest): Promise<APIResponse<null>>;
}
