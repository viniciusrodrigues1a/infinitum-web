import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import { IMarkNotificationAsReadService } from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class MarkNotificationAsReadService
  implements IMarkNotificationAsReadService
{
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async markNotificationAsRead(
    notificationId: string
  ): Promise<APIResponse<null>> {
    try {
      await this.axiosInstance.patch(`/notifications/${notificationId}`);

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
