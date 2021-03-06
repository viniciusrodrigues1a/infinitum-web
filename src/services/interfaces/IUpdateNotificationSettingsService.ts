import { APIResponse } from "../type-defs/APIResponse";

export type UpdateNotificationSettingsServiceRequest = {
  settings: {
    invitation: { email: boolean; push: boolean };
    kicked: { email: boolean; push: boolean };
    roleUpdated: { email: boolean; push: boolean };
    issueAssigned: { email: boolean; push: boolean };
    projectDeleted: { email: boolean; push: boolean };
    kickedAdmin: { email: boolean; push: boolean };
    roleUpdatedAdmin: { email: boolean; push: boolean };
  };
};

export interface IUpdateNotificationSettingsService {
  updateNotificationSettings(
    data: UpdateNotificationSettingsServiceRequest
  ): Promise<APIResponse<null>>;
}
