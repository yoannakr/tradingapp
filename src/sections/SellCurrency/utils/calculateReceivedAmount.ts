import { calculateFee } from "./calculateFee";
export const calculateReceivedAmount = (
  price: number,
  amount: number
): number => {
  const fee = calculateFee();
  if (price <= 0) {
    return 0;
  }
  return amount * price * fee;
};
