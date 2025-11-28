export interface MyAuctionItem {
  id: number;
  title: string;

  imageUrl: string | null; // 백엔드 원본
  imageUrls: string[]; // 프론트에서 쓰는 변환된 배열

  currentPrice: number; // 백엔드 값
  price: number; // 프론트에서 편하게 쓰는 값

  endAt: string;
  status: string;

  timeLeft?: {
    hours: number;
    minutes: number;
  };
}

export interface MyAuctionsResponse {
  auctions: MyAuctionItem[];
}
