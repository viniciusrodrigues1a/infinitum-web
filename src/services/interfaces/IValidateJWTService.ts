import { APIResponse } from "../type-defs/APIResponse";

export type ValidateJWTServiceRequest = {
  jwt: string;
};

export interface IValidateJWTService {
  validateJWT(data: ValidateJWTServiceRequest): Promise<APIResponse<boolean>>;
}
