import instance from "@/apis/instance";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await instance.post("/api/s3/test/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  console.log("📥 S3 업로드 응답:", res.data);
  return res.data;
};
