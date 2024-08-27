export type ApiResponseSuccess = {
  success: true;
  data: any;
};

export type ApiResponseError = {
  success: false;
  errors: any[];
};

export type ApiResponse = ApiResponseSuccess | ApiResponseError;
