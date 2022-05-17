import { AxiosInstance } from "axios";
import {
  IListLanguagesService,
  ListLanguagesServiceResponse,
} from "./interfaces/IListLanguagesService";
import { APIResponse } from "./type-defs/APIResponse";

export default class ListLanguagesService implements IListLanguagesService {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async listLanguages(): Promise<APIResponse<ListLanguagesServiceResponse>> {
    try {
      const response = await this.axiosInstance.get("/languages/");

      return {
        data: response.data as ListLanguagesServiceResponse,
        error: false,
      };
    } catch (err) {
      return {
        data: null,
        error: true,
      };
    }
  }
}
