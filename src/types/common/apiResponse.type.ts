export type CommonResponse<T> = {
  success: boolean;
  status: string;
  message: string;
  timestamp: string;
  result: T;
};

// 응답 Response
export type ApiResponse<T> = Promise<CommonResponse<T>>;

// 응답 데이터가 없는 경우
export type NoResponse = Record<string, never>;

// 에러 Response
export type ErrorResponse = CommonResponse<Record<string, never>>;
