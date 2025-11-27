export const formatPrice = (price: number) => {
  return `₩ ${price.toLocaleString("ko-KR")}`;
};
export const formatPriceSimple = (price: number) => {
  return `${price.toLocaleString("ko-KR")}`;
};
