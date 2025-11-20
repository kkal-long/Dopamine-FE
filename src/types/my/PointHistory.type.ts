export interface PointItemData {
  id: number;
  type: "CHARGE" | "USE";
  title?: string;
  date: string;
  amount: number;
}
