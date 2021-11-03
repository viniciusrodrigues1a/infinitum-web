import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  IUpdateProjectService,
  UpdateProjectServiceRequest,
} from "./interfaces/IUpdateProjectService";
import { APIResponse } from "./type-defs/APIResponse";

export default class UpdateProjectService implements IUpdateProjectService {
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async updateProject({
    projectId,
    name,
    description,
    beginsAt,
    finishesAt,
  }: UpdateProjectServiceRequest): Promise<APIResponse<null>> {
    try {
      const body = { name, description, beginsAt, finishesAt };
      await this.axiosInstance.put(`/projects/${projectId}`, body);

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
