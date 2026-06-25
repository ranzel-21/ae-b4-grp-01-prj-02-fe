export interface ApiSuccessResponse<TData> {
  data: TData;
}

export interface ApiErrorDetails {
  [key: string]: unknown;
}

export interface ApiErrorShape {
  code: string;
  message: string;
  details?: ApiErrorDetails;
}

export class ApiError extends Error {
  code: string;
  details?: ApiErrorDetails;

  constructor(error: ApiErrorShape) {
    super(error.message);
    this.name = "ApiError";
    this.code = error.code;
    this.details = error.details;
  }
}
