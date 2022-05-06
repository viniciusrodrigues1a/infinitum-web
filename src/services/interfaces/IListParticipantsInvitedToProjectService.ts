import { APIResponse } from "../type-defs/APIResponse";

export type ListParticipantsInvitedToProjectServiceRequest = {
  projectId: string;
};

export type ListParticipantsInvitedToProjectServiceResponse = {
  name: string;
  email: string;
}[];

export interface IListParticipantsInvitedToProjectService {
  list(
    data: ListParticipantsInvitedToProjectServiceRequest
  ): Promise<APIResponse<ListParticipantsInvitedToProjectServiceResponse>>;
}
