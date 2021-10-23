import { APIResponse } from "../type-defs/APIResponse";

export type LoginServiceRequest = {
  email: string;
  password: string;
};

export type LoginServiceResponse = {
  token: string;
};

export interface ILoginService {
  login(data: LoginServiceRequest): Promise<APIResponse<LoginServiceResponse>>;
}
