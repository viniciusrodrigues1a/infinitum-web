import { APIResponse } from "../type-defs/APIResponse";
import { Project } from "../type-defs/Project";

export type ListProjectsServiceResponse = Project;

export interface IListProjectsService {
  list(): Promise<APIResponse<ListProjectsServiceResponse[]>>;
}
