import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  DeleteProjectServiceRequest,
  IDeleteProjectService,
} from "./interfaces/IDeleteProjectService";
import { APIResponse } from "./type-defs/APIResponse";

export default class DeleteProjectService implements IDeleteProjectService {
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async deleteProject({
    projectId,
  }: DeleteProjectServiceRequest): Promise<APIResponse<null>> {
    try {
      await this.axiosInstance.delete(`/projects/${projectId}`);

      return { data: null, error: false };
    } catch (err) {
      if (err.response) {
        const userFriendlyMessage = err.response.data.error.message;
        return { data: null, error: true, userFriendlyMessage };
      }

      return {
        data: null,
        error: true,
        userFriendlyMessage: this.language.unexpectedErrorMessage,
      };
    }
  }
}
