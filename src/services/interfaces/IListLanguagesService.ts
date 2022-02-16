import { APIResponse } from "../type-defs/APIResponse";

export type ListLanguagesServiceResponse = {
  id: string;
  isoCode: string;
  displayName: string;
}[];

export interface IListLanguagesService {
  listLanguages(): Promise<APIResponse<ListLanguagesServiceResponse>>;
}
