// src/apis/auction/imageApi.ts
import instance from "@/apis/instance";
import { ImageUploadResponse } from "@/types/auction/image";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await instance.post<ImageUploadResponse>(
    "/api/s3/test/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};
