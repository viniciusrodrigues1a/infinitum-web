import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  DeleteIssueGroupServiceRequest,
  IDeleteIssueGroupService,
} from "./interfaces/IDeleteIssueGroupService";
import { APIResponse } from "./type-defs/APIResponse";

export default class DeleteIssueGroupService
  implements IDeleteIssueGroupService
{
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async deleteIssueGroup({
    issueGroupId,
  }: DeleteIssueGroupServiceRequest): Promise<APIResponse<null>> {
    try {
      await this.axiosInstance.delete(`/issueGroups/${issueGroupId}`);

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
