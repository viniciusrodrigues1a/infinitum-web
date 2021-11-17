import { AxiosInstance } from "axios";
import { AxiosLanguage } from "../languages/types/libs";
import { IUpdateRoleService, UpdateRoleServiceRequest } from "./interfaces";
import { APIResponse } from "./type-defs/APIResponse";

export default class UpdateRoleService implements IUpdateRoleService {
  private readonly axiosInstance: AxiosInstance;

  private readonly language: AxiosLanguage;

  constructor(axiosInstance: AxiosInstance, language: AxiosLanguage) {
    this.axiosInstance = axiosInstance;
    this.language = language;
  }

  async updateRole({
    roleName,
    projectId,
    accountEmail,
  }: UpdateRoleServiceRequest): Promise<APIResponse<null>> {
    try {
      const body = { roleName, projectId, accountEmail };
      await this.axiosInstance.patch("/projects/participantRole/", body);

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
