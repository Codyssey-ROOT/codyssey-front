/** Envelope every backend response is wrapped in. */
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  errorCode?: number;
  data: T;
}
