export type ValidationResponse<T> =
  | ValidationResponseSuccess<T>
  | ValidationResponseError;

export type ValidationResponseSuccess<T> = {
  success: true;
  validData: T;
};

export type ValidationResponseError = {
  success: false;
  errors: string[];
};
