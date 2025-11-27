import { getPointHisotry } from "@/apis/my/pointApi";
import { useQuery } from "@tanstack/react-query";

export const usePointApi = () => {
  const getPointHisotryQuery = () => {
    return useQuery({
      queryFn: getPointHisotry,
      queryKey: ["pointHistory"],
    });
  };

  return { getPointHisotryQuery };
};
