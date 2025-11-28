export const conditions = [
  "S급(새상품급)",
  "A급(미세 사용감)",
  "B급(사용감 있음)",
  "C급(생활감 많음)",
  "D급(수리/부품 필요)",
  "New(미개봉 새상품)",
];

export const conditionMap: Record<string, string> = {
  "S급(새상품급)": "S급",
  "A급(미세 사용감)": "A급",
  "B급(사용감 있음)": "B급",
  "C급(생활감 많음)": "C급",
  "D급(수리/부품 필요)": "D급",
  "New(미개봉 새상품)": "New",
};

export const deliveryMethods = ["직거래", "택배"];
export const durations = ["12시간", "24시간"];
