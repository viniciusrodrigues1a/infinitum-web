export type APIResponse<T> = {
  data: T | null;
  error: boolean;
  userFriendlyMessage?: string;
};
