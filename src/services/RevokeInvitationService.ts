import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  IRevokeInvitationService,
  RevokeInvitationServiceRequest,
} from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class RevokeInvitationService
  implements IRevokeInvitationService
{
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async revokeInvitation({
    projectId,
    accountEmail,
  }: RevokeInvitationServiceRequest): Promise<APIResponse<null>> {
    try {
      await this.axiosInstance.post("/invitations/revoke", {
        projectId,
        accountEmail,
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
