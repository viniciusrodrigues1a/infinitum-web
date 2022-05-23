import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  IRefreshTokenService,
  RefreshTokenServiceResponse,
} from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class RefreshTokenService implements IRefreshTokenService {
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async refresh(
    token: string
  ): Promise<APIResponse<RefreshTokenServiceResponse>> {
    try {
      const response = await this.axiosInstance.post("/auth/refresh", {
        token,
      });

      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const { data } = response as any;

      return {
        data: {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        },
        error: false,
      };
    } catch (err) {
      return {
        data: null,
        error: true,
        userFriendlyMessage: this.language.unexpectedErrorMessage,
      };
    }
  }
}
