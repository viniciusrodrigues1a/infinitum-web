import { APIResponse } from "../type-defs/APIResponse";

export type FindProjectImageServiceResponse = {
  dataURL: string;
};

export interface IFindProjectImageService {
  findProjectImage(
    projectId: string
  ): Promise<APIResponse<FindProjectImageServiceResponse>>;
}
