export interface ItemData {
  title: string; // 상품명
  state: "RUNNING" | "ENDED"; // 경매 상태
  endsAt: string; // 경매 종료시간
  currentPrice: number; // 상품 가격
  bidCount: number; // 입찰자 수
  myPrice: number | null; // 내 입찰가
  winnerId: number; // 낙찰자
  description: string; // 상품 설명
  item: {
    condition: string; // 상태
    category: string; // 카테고리
    year: number; // 연식
    location: string; // 위치
  };
  seller: {
    id: number; // 판매자 id
    image: string; // 판매자 사진
    name: string; // 판매자 이름
  };
  roomId: number; // 채팅방 번호
}

export type ViewState = "LIVE" | "LIVE_BIDDING" | "WON" | "LOST" | "ENDED";
