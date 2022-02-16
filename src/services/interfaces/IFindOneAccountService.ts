import { APIResponse } from "../type-defs/APIResponse";

export type FindOneAccountServiceResponse = {
  name: string;
  email: string;
  languageId: string | undefined;
  image: string | undefined;
};

export interface IFindOneAccountService {
  findOneAccount(
    email: string
  ): Promise<APIResponse<FindOneAccountServiceResponse>>;
}
