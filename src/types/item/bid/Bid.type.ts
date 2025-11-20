import type { ComponentType, SVGProps } from "react";

export interface WonItemData {
  autionId: number;
  title: string;
  image: string;
  wonPrice: number;
  state: "ENDED";
  roomId: number;
}

export interface WonItems {
  autions: WonItemData[];
}

export interface BiddingItemData {
  autionId: number;
  title: string;
  image: string;
  bidPrice: number;
  state: "RUNNING" | "ENDED";
  endsAt: string;
}

export interface BiddingItems {
  autions: BiddingItemData[];
}

export type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type MainPageProduct = {
  id: string;
  title: string;
  // 둘 중 하나만 채우면 됨
  imageUrl?: string;
  ImageIcon?: SvgIcon; // <Mock1 /> 같은 컴포넌트
  highestBid: number;
  bidPlaced?: boolean;
  bidPrice?: number;
};
