import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  IListParticipantsInvitedToProjectService,
  ListParticipantsInvitedToProjectServiceRequest,
  ListParticipantsInvitedToProjectServiceResponse,
} from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class ListParticipantsInvitedToProjectService
  implements IListParticipantsInvitedToProjectService
{
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async list({
    projectId,
  }: ListParticipantsInvitedToProjectServiceRequest): Promise<
    APIResponse<ListParticipantsInvitedToProjectServiceResponse>
  > {
    try {
      const response = await this.axiosInstance.get(
        `/projects/invitedParticipants/${projectId}`
      );

      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      return { data: response.data as any, error: false };
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
