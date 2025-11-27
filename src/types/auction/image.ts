export interface ImageUploadResponse {
  success: boolean;
  status: number;
  message: string;
  timestamp: string;
  result: {
    url?: string;
  };
}
