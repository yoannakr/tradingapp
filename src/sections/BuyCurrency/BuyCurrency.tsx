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
import { incrementBitcoinAvailability } from "../Wallet/walletSlice";
import { BuyCurrencyWrapper } from "./styled";
import { calculateCryptoCurrencyCount } from "./utils/calculateCryptoCurrencyCount";

export const BuyCurrency = () => {
  const dispatch = useAppDispatch();
  const selectedCryptoCurrency = useSelector(selectCryptoCurrency);
  const selectedCurrency = useSelector(selectCurrency);
  const balance = useSelector(selectBalance);

  const price = getBitcoinPriceForCurrency(
    selectedCryptoCurrency,
    selectedCurrency
  );

  const [amount, setAmount] = useState<number>(0);

  const cryptoCurrencyCount = useMemo<number>(
    () => calculateCryptoCurrencyCount(price, amount),
    [price, amount]
  );

  const handleAmountChange = (amountInput: any) => {
    if (!isNaN(amountInput)) {
      setAmount(+amountInput);
    }
  };

  const handleBuyCryptoCurrency = () => {
    const newBalance = balance - amount;
    if (newBalance < 0) {
      BOMessage.error("Cannot buy bitcoin, not enough balance.");
      return;
    }

    dispatch(updateBalance(newBalance));
    dispatch(
      incrementBitcoinAvailability({
        name: selectedCryptoCurrency.name,
        ticker: selectedCryptoCurrency.ticker,
        availableCount: cryptoCurrencyCount,
      })
    );
    BOMessage.success("Bitcoin was bought successful.");
  };

  return (
    <BuyCurrencyWrapper>
      <div style={{ marginBottom: "1em" }}>
        <span style={{ color: "#7f838c" }}>Avbl </span>
        <span style={{ color: "white" }}>{`${balance.toFixed(
          2
        )} ${selectedCurrency}`}</span>
      </div>
      <BOInputNumber
        label="Amount"
        value={amount}
        addonAfter={selectedCurrency}
        style={{ width: "100%" }}
        onChange={handleAmountChange}
      />
      <BOInputNumber
        label="Total"
        value={cryptoCurrencyCount}
        addonAfter={selectedCryptoCurrency?.ticker}
        style={{ width: "100%" }}
        readOnly={true}
      />
      <BOButton
        style={{ width: "100%" }}
        content={`Buy ${selectedCryptoCurrency?.ticker}`}
        onClick={handleBuyCryptoCurrency}
      />
    </BuyCurrencyWrapper>
  );
};
