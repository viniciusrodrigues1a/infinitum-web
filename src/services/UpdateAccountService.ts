import { AxiosInstance } from "axios";
import {
  IUpdateAccountService,
  UpdateAccountServiceRequest,
} from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class UpdateAccountService implements IUpdateAccountService {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async updateAccount({
    file,
    name,
    email,
    password,
    languageId,
  }: UpdateAccountServiceRequest): Promise<APIResponse<null>> {
    try {
      const formData = new FormData();
      this.appendToFormDataIfNotFalsy("name", name, formData);
      this.appendToFormDataIfNotFalsy("email", email, formData);
      this.appendToFormDataIfNotFalsy("password", password, formData);
      this.appendToFormDataIfNotFalsy("languageId", languageId, formData);
      this.appendToFormDataIfNotFalsy("file", file, formData);

      await this.axiosInstance.patch("/accounts/", formData);

      return { data: null, error: false };
    } catch (err) {
      return {
        data: null,
        error: true,
      };
    }
  }

  private appendToFormDataIfNotFalsy(key: string, val: any, fd: FormData) {
    if (val) {
      fd.append(key, val);
    }
  }
}
