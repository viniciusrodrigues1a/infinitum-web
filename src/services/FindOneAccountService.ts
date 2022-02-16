import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import {
  FindOneAccountServiceResponse,
  IFindOneAccountService,
} from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class FindOneAccountService implements IFindOneAccountService {
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async findOneAccount(
    email: string
  ): Promise<APIResponse<FindOneAccountServiceResponse>> {
    try {
      const response = await this.axiosInstance.get(`/accounts?email=${email}`);

      return {
        data: response.data as FindOneAccountServiceResponse,
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
