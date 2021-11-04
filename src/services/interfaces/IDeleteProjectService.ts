import { APIResponse } from "../type-defs/APIResponse";

export type DeleteProjectServiceRequest = {
  projectId: string;
};

export interface IDeleteProjectService {
  deleteProject(data: DeleteProjectServiceRequest): Promise<APIResponse<null>>;
}
