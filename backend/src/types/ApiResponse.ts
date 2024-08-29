export type ApiResponseSuccess<T> = {
  success: true;
  data: T;
};

export type ApiResponseError = {
  success: false;
  errors: any[];
};

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;
