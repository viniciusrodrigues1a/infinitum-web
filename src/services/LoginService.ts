import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  ILoginService,
  LoginServiceRequest,
  LoginServiceResponse,
} from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class LoginService implements ILoginService {
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async login({
    email,
    password,
  }: LoginServiceRequest): Promise<APIResponse<LoginServiceResponse>> {
    try {
      const body = { email, password };
      const response = await this.axiosInstance.post("/auth/login", body);

      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      return { data: { token: (response.data as any).token }, error: false };
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
