import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  GetIssuesOverviewServiceResponse,
  IGetIssuesOverviewService,
} from "./interfaces/IGetIssuesOverviewService";
import { APIResponse } from "./type-defs/APIResponse";

export default class GetIssuesOverviewService
  implements IGetIssuesOverviewService
{
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async getIssuesOverview(): Promise<
    APIResponse<GetIssuesOverviewServiceResponse>
  > {
    try {
      const response = await this.axiosInstance.get("/issues/overview");

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
