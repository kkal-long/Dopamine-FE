import type { ComponentType, SVGProps } from "react";

export type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type MainPageProduct = {
  id: string;
  title: string;
  imageUrl?: string;
  ImageIcon?: SvgIcon;
  highestBid: number;
  bidPlaced?: boolean;
  bidPrice?: number;
};
