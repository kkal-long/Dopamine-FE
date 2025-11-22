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
