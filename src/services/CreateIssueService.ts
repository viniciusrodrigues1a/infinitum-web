import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  CreateIssueServiceRequest,
  ICreateIssueService,
} from "./interfaces/ICreateIssueService";
import { APIResponse } from "./type-defs/APIResponse";

export default class CreateIssueService implements ICreateIssueService {
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async createIssue({
    title,
    description,
    expiresAt,
    issueGroupId,
  }: CreateIssueServiceRequest): Promise<APIResponse<null>> {
    try {
      await this.axiosInstance.post("/issues/", {
        title,
        description,
        expiresAt,
        issueGroupId,
      });

      return { data: null, error: false };
    } catch (err) {
      if (err.response) {
        if (err.response) {
          const userFriendlyMessage = err.response.data.error.message;
          return { data: null, error: true, userFriendlyMessage };
        }
      }

      return {
        data: null,
        error: true,
        userFriendlyMessage: this.language.unexpectedErrorMessage,
      };
    }
  }
}
