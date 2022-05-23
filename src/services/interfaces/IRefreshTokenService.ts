import { APIResponse } from "../type-defs/APIResponse";

export type RefreshTokenServiceResponse = {
  accessToken: string;
  refreshToken: string;
};

export interface IRefreshTokenService {
  refresh(token: string): Promise<APIResponse<RefreshTokenServiceResponse>>;
}
