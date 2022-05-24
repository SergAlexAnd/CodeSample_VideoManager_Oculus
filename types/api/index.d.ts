export interface ApiResponse<T = undefined> {
  data: T | null;
  success: boolean;
  message: null | string;
}
