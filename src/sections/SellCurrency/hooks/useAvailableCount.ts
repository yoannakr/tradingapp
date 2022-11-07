import { useSelector } from "react-redux";
import { selectBitcoinsAvailability } from "../../Wallet/walletSlice";

export const useAvailableCount = (ticker: string) => {
  const walletBitcoins = useSelector(selectBitcoinsAvailability);

  const availableCount =
    walletBitcoins.find(
      (bitcoin) => bitcoin.ticker.toLowerCase() === ticker.toLowerCase()
    )?.availableCount ?? 0;

  return availableCount;
};
