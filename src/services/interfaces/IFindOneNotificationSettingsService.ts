import { APIResponse } from "../type-defs/APIResponse";
import { UpdateNotificationSettingsServiceRequest } from "./IUpdateNotificationSettingsService";

export type FindOneNotificationSettingsServiceResponse =
  UpdateNotificationSettingsServiceRequest["settings"];

export interface IFindOneNotificationSettingsService {
  findOneNotificationSettings(): Promise<
    APIResponse<FindOneNotificationSettingsServiceResponse>
  >;
}
