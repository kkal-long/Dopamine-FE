export interface SellerData {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

export interface WinnerData {
  userId: number;
  username: string;
  profileImageUrl: string;
}

export interface CategoryData {
  categoryId: number;
  categoryName: string;
}

export interface AuctionDetailResponse {
  auctionId: number;
  seller: SellerData;
  goodsName: string;
  description: string;
  startPrice: number;
  imageUrl: string[];
  status: "IN_PROGRESS" | "SOLD" | "CANCELED";
  transactionMethod: "FACE_TO_FACE" | "DELIVERY";
  startAt: string;
  endAt: string;
  condition: string;
  manufactureYear: string;
  location: string;
  hideBidPrice: boolean;
  winner: WinnerData | null;
  totalNumOfBidder: number;
  categories: CategoryData[];
  myBidPrice: number | null;
}
