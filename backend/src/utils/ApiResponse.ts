import { ApiResponseError, ApiResponseSuccess } from 'src/types/ApiResponse';

export const successResponse = (data: any): ApiResponseSuccess => {
  return {
    success: true,
    data: data,
  };
};

export const errorResponse = (errors: any[]): ApiResponseError => {
  return {
    success: false,
    errors: errors,
  };
};
