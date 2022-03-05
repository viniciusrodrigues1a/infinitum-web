import { APIResponse } from "../type-defs/APIResponse";

export interface IMarkNotificationAsReadService {
  markNotificationAsRead(notificationId: string): Promise<APIResponse<null>>;
}
