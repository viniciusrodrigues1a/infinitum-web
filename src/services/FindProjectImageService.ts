import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  FindProjectImageServiceResponse,
  IFindProjectImageService,
} from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class FindProjectImageService
  implements IFindProjectImageService
{
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async findProjectImage(
    projectId: string
  ): Promise<APIResponse<FindProjectImageServiceResponse>> {
    try {
      const response = await this.axiosInstance.get(
        `/projects/${projectId}/image`
      );

      return {
        data: response.data as FindProjectImageServiceResponse,
        error: false,
      };
    } catch (err) {
      return {
        data: null,
        error: true,
      };
    }
  }
}
