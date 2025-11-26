// useImageUpload.ts
import { uploadImage } from "@/apis/auction/imageApi";
import { useState } from "react";

export const useImageUpload = () => {
  const [loading, setLoading] = useState(false);

  const uploadImages = async (files: File[]) => {
    setLoading(true);

    try {
      const urls: string[] = [];

      for (const file of files) {
        console.log("📤 업로드 요청:", file.name);
        const res = await uploadImage(file);
        console.log("📥 업로드 응답:", res);

        /**
         * 🔥 백엔드가 이미지 URL을 "문자열"로 반환하는 형태라면
         *    (예: "https://bucket.s3.amazonaws.com/xxx.jpg")
         *    그대로 push 해줘야 함
         */
        if (typeof res === "string") {
          urls.push(res);
          continue;
        }

        /**
         * 🔥 혹시 백엔드가 JSON 형태로 반환할 가능성도 대비
         *    (예: { result: { url: "..." } })
         */
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
