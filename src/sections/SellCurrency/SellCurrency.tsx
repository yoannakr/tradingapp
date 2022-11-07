import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { BOMessage } from "../../shared/components/antd";
import { BOInputNumber } from "../../shared/components/antd/DataEntry/InputNumber/BOInputNumber";
import { BOButton } from "../../shared/components/antd/General/Button/BOButton";
import { getBitcoinPriceForCurrency } from "../../shared/utils/getBitcoinPriceForCurrency";
import { selectCryptoCurrency } from "../CurrenciesPairs/currenciesPairsSlice";
import {
  updateBalance,
  selectBalance,
  selectCurrency,
} from "../Header/headerSlice";
import { decrementBitcoinAvailability } from "../Wallet/walletSlice";
import { useAvailableCount } from "./hooks/useAvailableCount";
import { SellCurrencyWrapper } from "./styled";
import { calculateReceivedAmount } from "./utils/calculateReceivedAmount";

export const SellCurrency = () => {
  const dispatch = useAppDispatch();
  const selectedCryptoCurrency = useSelector(selectCryptoCurrency);
  const selectedCurrency = useSelector(selectCurrency);
  const balance = useSelector(selectBalance);

  const price = getBitcoinPriceForCurrency(
    selectedCryptoCurrency,
    selectedCurrency
  );
  const availableCount = useAvailableCount(selectedCryptoCurrency.ticker);

  const [amount, setAmount] = useState<number>(0);

  const receivedAmount = useMemo<number>(
    () => calculateReceivedAmount(price, amount),
    [price, amount]
  );

  const handleAmountChange = (amountInput: any) => {
    if (!isNaN(amountInput)) {
      setAmount(+amountInput);
    }
  };

  const handleSellCryptoCurrency = () => {
    const newCryptoCurrencyCount = availableCount - amount;
    if (newCryptoCurrencyCount < 0) {
      BOMessage.error("Cannot sell bitcoin, not enough available count.");
      return;
    }

    const newBalance = balance + receivedAmount;

    dispatch(updateBalance(newBalance));
    dispatch(
      decrementBitcoinAvailability({
        name: selectedCryptoCurrency.name,
        ticker: selectedCryptoCurrency.ticker,
        availableCount: amount,
      })
    );
    BOMessage.success("Bitcoin was sold successful.");
  };

  return (
    <SellCurrencyWrapper>
      <div style={{ color: "red" }}>
        <span>Available Count: {availableCount}</span>
      </div>
      <BOInputNumber
        label="Price"
        value={price.toFixed(2)}
        addonAfter={selectedCryptoCurrency?.ticker}
        style={{ width: "100%" }}
      />
      <BOInputNumber
        label="Amount"
        value={amount}
        addonAfter={selectedCurrency}
        style={{ width: "100%" }}
        onChange={handleAmountChange}
      />
      <div>{receivedAmount}</div>
      <BOButton
        style={{ width: "100%" }}
        content={`Sell ${selectedCryptoCurrency?.ticker}`}
        onClick={handleSellCryptoCurrency}
      />
    </SellCurrencyWrapper>
  );
};
