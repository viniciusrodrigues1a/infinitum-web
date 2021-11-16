import { APIResponse } from "../type-defs/APIResponse";

export type KickParticipantServiceRequest = Partial<{
  projectId: string;
  accountEmail: string;
}>;

export interface IKickParticipantService {
  kickParticipant(
    data: KickParticipantServiceRequest
  ): Promise<APIResponse<null>>;
}
