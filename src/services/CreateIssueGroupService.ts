import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  CreateIssueGroupServiceRequest,
  ICreateIssueGroupService,
} from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class CreateIssueGroupService
  implements ICreateIssueGroupService
{
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async createIssueGroup({
    title,
    projectId,
  }: CreateIssueGroupServiceRequest): Promise<APIResponse<null>> {
    try {
      await this.axiosInstance.post("/issueGroups", {
        title,
        projectId,
      });

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
