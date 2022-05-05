import { APIResponse } from "../type-defs/APIResponse";

export type RevokeInvitationServiceRequest = {
  projectId: string;
  accountEmail: string;
};

export interface IRevokeInvitationService {
  revokeInvitation(
    data: RevokeInvitationServiceRequest
  ): Promise<APIResponse<null>>;
}
