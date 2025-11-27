export interface ChargePointRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface ChargePointResponse {
  success: boolean;
  message: string;
  paymentKey: string;
  orderId: string;
  amount: number;
  userId: number;
  userPoint: number;
}

export interface PointHistoryData {
  historyId: number;
  changeAmount: number;
  type: "CHARGE" | "WITHDRAW" | "BID_DEPOSIT" | "REFUND" | "PURCHASE" | "SALE";
  createdAt: string;
}

export type PointHistoryResponse = PointHistoryData[];
