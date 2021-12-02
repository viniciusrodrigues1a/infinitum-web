import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  IUpdateIssueGroupFinalStatusService,
  UpdateIssueGroupFinalStatusServiceRequest,
} from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class UpdateIssueGroupFinalStatusService
  implements IUpdateIssueGroupFinalStatusService
{
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async updateIssueGroupFinalStatus({
    newIsFinal,
    issueGroupId,
  }: UpdateIssueGroupFinalStatusServiceRequest): Promise<APIResponse<null>> {
    try {
      const body = { newIsFinal };
      await this.axiosInstance.patch(
        `/issueGroups/${issueGroupId}/final`,
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
