import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  AcceptInvitationServiceRequest,
  IAcceptInvitationService,
} from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class AcceptInvitationService
  implements IAcceptInvitationService
{
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async acceptInvitation({
    invitationToken,
  }: AcceptInvitationServiceRequest): Promise<APIResponse<null>> {
    try {
      await this.axiosInstance.post(`/invitations/accept/${invitationToken}`);

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
