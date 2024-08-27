export type CreationResponse<T> =
  | CreationResponseSuccess<T>
  | CreationResponseError;

export type CreationResponseSuccess<T> = {
  success: true;
  data: T;
};

export type CreationResponseError = {
  success: false;
  errors: string[];
};
