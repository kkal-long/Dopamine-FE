// src/hooks/auction/useImageUpload.ts
import { uploadImage } from "@/apis/auction/imageApi";
import { useState } from "react";

export const useImageUpload = () => {
  const [loading, setLoading] = useState(false);

  const uploadImages = async (files: File[]) => {
    setLoading(true);
    try {
      const urls: string[] = [];

      for (const file of files) {
        const res = await uploadImage(file);
        if (res?.result?.url) urls.push(res.result.url);
      }

      return urls;
    } finally {
      setLoading(false);
    }
  };

  return { uploadImages, loading };
};
