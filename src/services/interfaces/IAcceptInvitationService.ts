import { APIResponse } from "../type-defs/APIResponse";

export type AcceptInvitationServiceRequest = {
  invitationToken: string;
};

export interface IAcceptInvitationService {
  acceptInvitation(
    data: AcceptInvitationServiceRequest
  ): Promise<APIResponse<null>>;
}
