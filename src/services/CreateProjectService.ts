import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import { ICreateProjectService } from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class CreateProjectService implements ICreateProjectService {
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async createProject({
    name,
    description,
    beginsAt,
    finishesAt,
  }: Partial<{
    name: string;
    description: string;
    beginsAt: Date;
    finishesAt: Date;
  }>): Promise<APIResponse<string>> {
    try {
      const body = { name, description, beginsAt, finishesAt };
      const response = await this.axiosInstance.post("/projects/", body);

      return { data: (response.data as any).id, error: false };
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
