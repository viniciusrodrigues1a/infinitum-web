import { APIResponse } from "../type-defs/APIResponse";

export interface IMarkAllNotificationsAsReadService {
  markAllNotificationsAsRead(): Promise<APIResponse<null>>;
}
