import { uploadImage } from "@/apis/my/uploadImageApi";
import { useState } from "react";

export const useImageUpload = () => {
  const [loading, setLoading] = useState(false);

  const uploadImages = async (files: File[]) => {
    setLoading(true);

    try {
      const urls: string[] = [];

      for (const file of files) {
        const res = await uploadImage(file);

        if (typeof res === "string") {
          urls.push(res);
          continue;
        }

        if (res?.result?.url) {
          urls.push(res.result.url);
          continue;
        }

        console.warn("⚠ 업로드 응답에서 URL을 찾을 수 없습니다:", res);
      }

      return urls;
    } finally {
      setLoading(false);
    }
  };

  return { uploadImages, loading };
};
