import { AxiosInstance } from "axios";
import { IUpdateProjectImageService } from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class UpdateProjectImageService
  implements IUpdateProjectImageService
{
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async updateProjectImage(data: FormData): Promise<APIResponse<null>> {
    try {
      await this.axiosInstance.patch("/projects/image/", data);

      return { data: null, error: false };
    } catch (err) {
      return {
        data: null,
        error: true,
      };
    }
  }
}
