import instance from "@/apis/instance";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await instance.post("/api/s3/test/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
