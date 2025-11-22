import type { ComponentType, SVGProps } from "react";

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
