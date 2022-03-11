import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  FindOneNotificationSettingsServiceResponse,
  IFindOneNotificationSettingsService,
  UpdateNotificationSettingsServiceRequest,
} from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class FindOneNotificationSettingsService
  implements IFindOneNotificationSettingsService
{
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async findOneNotificationSettings(): Promise<
    APIResponse<UpdateNotificationSettingsServiceRequest["settings"]>
  > {
    try {
      const response = await this.axiosInstance.get("/notificationSettings/");

      return {
        data: response.data as FindOneNotificationSettingsServiceResponse,
        error: false,
      };
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
