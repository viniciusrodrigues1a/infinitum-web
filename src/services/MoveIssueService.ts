import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import { IMoveIssueService, MoveIssueServiceRequest } from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class MoveIssueService implements IMoveIssueService {
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async moveIssue({
    issueId,
    moveToIssueGroupId,
  }: MoveIssueServiceRequest): Promise<APIResponse<null>> {
    try {
      const body = { moveToIssueGroupId };
      await this.axiosInstance.patch(`/issues/${issueId}/move`, body);

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
