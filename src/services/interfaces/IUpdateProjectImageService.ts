import { APIResponse } from "../type-defs/APIResponse";

export interface IUpdateProjectImageService {
  updateProjectImage(data: FormData): Promise<APIResponse<null>>;
}
