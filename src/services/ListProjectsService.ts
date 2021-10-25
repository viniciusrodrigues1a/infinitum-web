import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  IListProjectsService,
  ListProjectsServiceResponse,
} from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class ListProjectsService implements IListProjectsService {
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async list(): Promise<APIResponse<ListProjectsServiceResponse[]>> {
    try {
      const response = await this.axiosInstance.get("/projects/");

      return { data: response.data as any, error: false };
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
