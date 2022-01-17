import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import { IValidateJWTService, ValidateJWTServiceRequest } from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class ValidateJWTService implements IValidateJWTService {
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async validateJWT(
    data: ValidateJWTServiceRequest
  ): Promise<APIResponse<boolean>> {
    try {
      await this.axiosInstance.get("/auth/validate", {
        headers: { Authorization: `Bearer ${data.jwt}` },
      });

      return { data: true, error: false };
    } catch (err) {
      return { data: false, error: true };
    }
  }
}
