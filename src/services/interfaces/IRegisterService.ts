import { APIResponse } from "../type-defs/APIResponse";

export type RegisterServiceRequest = {
  name: string;
  email: string;
  password: string;
};

export interface IRegisterService {
  register(data: RegisterServiceRequest): Promise<APIResponse<null>>;
}
