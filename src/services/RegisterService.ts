import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import { IRegisterService, RegisterServiceRequest } from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class RegisterService implements IRegisterService {
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async register({
    name,
    email,
    password,
    languageIsoCode,
  }: RegisterServiceRequest): Promise<APIResponse<null>> {
    try {
      const body = { name, email, password, languageIsoCode };
      await this.axiosInstance.post("/auth/register", body);

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
