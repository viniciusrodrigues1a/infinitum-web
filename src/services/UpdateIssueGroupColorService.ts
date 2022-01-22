import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  IUpdateIssueGroupColorService,
  UpdateIssueGroupColorServiceRequest,
} from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class UpdateIssueGroupColorService
  implements IUpdateIssueGroupColorService
{
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async updateIssueGroupColor({
    issueGroupId,
    newColor,
  }: UpdateIssueGroupColorServiceRequest): Promise<APIResponse<null>> {
    try {
      const body = { newColor };
      await this.axiosInstance.patch(
        `/issueGroups/${issueGroupId}/color`,
        body
      );

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
