import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { BOMessage, BOSlider } from "../../shared/components/antd";
import { BOInputNumber } from "../../shared/components/antd/DataEntry/InputNumber/BOInputNumber";
import { BOButton } from "../../shared/components/antd/General/Button/BOButton";
import { getBitcoinPriceForCurrency } from "../../shared/utils/getBitcoinPriceForCurrency";
import { sliderMarks } from "../../shared/utils/sliderMarks";
import { selectCryptoCurrency } from "../CurrenciesPairs/currenciesPairsSlice";
import {
  selectBalance,
  selectCurrency,
  updateBalance,
} from "../Header/headerSlice";
import { addRecord } from "../History/historySlice";
import { RecordType } from "../History/types";
import { percentageCalculator } from "../SellCurrency/utils/percentageCalculator";
import { incrementBitcoinAvailability } from "../Wallet/walletSlice";
import { BuyCurrencyWrapper } from "./styled";
import { calculateCryptoCurrencyCount } from "./utils/calculateCryptoCurrencyCount";

export const BuyCurrency = () => {
  const dispatch = useAppDispatch();
  const selectedCurrency = useSelector(selectCurrency);
  const selectedCryptoCurrency = useSelector(selectCryptoCurrency);
  const balance = useSelector(selectBalance);

  const price = getBitcoinPriceForCurrency(
    selectedCryptoCurrency,
    selectedCurrency
  );

  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [percentageOfCount, setPercentageOfCount] = useState<number>(0);

  const cryptoCurrencyCount = useMemo<number>(
    () => calculateCryptoCurrencyCount(price, amount ?? 0),
    [price, amount]
  );

  useEffect(() => {
    setAmount(percentageCalculator(balance, percentageOfCount));
  }, [balance, percentageOfCount]);

  const handleAmountChange = (amountInput: any) => {
    if (!isNaN(amountInput)) {
      setAmount(+amountInput);
    }
  };

  const handlePercentageChange = (percentageOfCountInput: number) => {
    setPercentageOfCount(percentageOfCountInput);
  };

  const handleBuyCryptoCurrency = () => {
    const newBalance = balance - (amount ?? 0);
    if (newBalance < 0) {
      BOMessage.error("Cannot buy bitcoin, not enough balance.");
      return;
    }

    dispatch(updateBalance(newBalance));

    dispatch(
      incrementBitcoinAvailability({
        name: selectedCryptoCurrency?.name ?? "",
        ticker: selectedCryptoCurrency?.ticker ?? "",
        availableCount: cryptoCurrencyCount,
      })
    );

    dispatch(
      addRecord({
        date: moment().format("DD/MM/yyyy HH:mm"),
        ticker: selectedCryptoCurrency?.ticker ?? "",
        name: selectedCryptoCurrency?.name ?? "",
        price: price,
        count: cryptoCurrencyCount,
        type: RecordType.BUY,
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
        value={amount?.toFixed(2)}
        placeholder={"0"}
        addonAfter={selectedCurrency}
        style={{ width: "100%" }}
        onChange={handleAmountChange}
      />
      <BOInputNumber
        label="Total"
        value={cryptoCurrencyCount.toFixed(8)}
        addonAfter={selectedCryptoCurrency?.ticker}
        style={{ width: "100%" }}
        readOnly={true}
      />
      <BOSlider
        marks={sliderMarks}
        value={percentageOfCount}
        onChange={handlePercentageChange}
      />
      <BOButton
        style={{ width: "100%", backgroundColor: "#0fcb81", color: "white" }}
        content={`Buy ${selectedCryptoCurrency?.ticker}`}
        onClick={handleBuyCryptoCurrency}
        disabled={(amount?.toFixed(2) ?? 0) <= 0}
      />
    </BuyCurrencyWrapper>
  );
};
