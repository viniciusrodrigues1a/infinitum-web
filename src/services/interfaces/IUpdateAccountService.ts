import { APIResponse } from "../type-defs/APIResponse";

export type UpdateAccountServiceRequest = Partial<{
  name: string;
  email: string;
  password: string;
  languageId: string;
  file: File | null;
}>;

export interface IUpdateAccountService {
  updateAccount(data: UpdateAccountServiceRequest): Promise<APIResponse<null>>;
}
