import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import { IAssignIssueToAccountService } from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class AssignIssueToAccountService
  implements IAssignIssueToAccountService
{
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async assignIssueToAccount(
    body: Partial<{ issueId: string; assignedToEmail: string }>
  ): Promise<APIResponse<null>> {
    try {
      await this.axiosInstance.patch(`/issues/${body.issueId}/assign`, body);

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
