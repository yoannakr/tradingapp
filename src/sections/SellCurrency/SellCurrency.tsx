import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { BOMessage, BOSlider } from "../../shared/components/antd";
import { BOInputNumber } from "../../shared/components/antd/DataEntry/InputNumber/BOInputNumber";
import { BOButton } from "../../shared/components/antd/General/Button/BOButton";
import { getBitcoinPriceForCurrency } from "../../shared/utils/getBitcoinPriceForCurrency";
import { selectCryptoCurrency } from "../CurrenciesPairs/currenciesPairsSlice";
import {
  updateBalance,
  selectBalance,
  selectCurrency,
} from "../Header/headerSlice";
import { addRecord } from "../History/historySlice";
import { RecordType } from "../History/types";
import {
  decrementBitcoinAvailability,
  selectAvailableCountAboutBitcoin,
} from "../Wallet/walletSlice";
import { SellCurrencyWrapper } from "./styled";
import { calculateReceivedAmount } from "./utils/calculateReceivedAmount";
import { sliderMarks } from "../../shared/utils/sliderMarks";
import { percentageCalculator } from "./utils/percentageCalculator";

export const SellCurrency = () => {
  const dispatch = useAppDispatch();
  const selectedCryptoCurrency = useSelector(selectCryptoCurrency);
  const selectedCurrency = useSelector(selectCurrency);
  const balance = useSelector(selectBalance);
  const availableCount = useSelector(selectAvailableCountAboutBitcoin);

  const price = getBitcoinPriceForCurrency(
    selectedCryptoCurrency,
    selectedCurrency
  );

  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [percentageOfCount, setPercentageOfCount] = useState<number>(0);

  const receivedAmount = useMemo<number>(
    () => calculateReceivedAmount(price, amount ?? 0),
    [price, amount]
  );

  useEffect(() => {
    setAmount(percentageCalculator(availableCount, percentageOfCount));
  }, [availableCount, percentageOfCount]);

  const handleAmountChange = (amountInput: any) => {
    if (!isNaN(amountInput)) {
      setAmount(+amountInput);
    }
  };

  const handlePercentageChange = (percentageOfCountInput: number) => {
    setPercentageOfCount(percentageOfCountInput);
  };

  const handleSellCryptoCurrency = () => {
    const newCryptoCurrencyCount = availableCount - (amount ?? 0);
    if (newCryptoCurrencyCount < 0) {
      BOMessage.error("Cannot sell bitcoin, not enough available count.");
      return;
    }

    const newBalance = balance + receivedAmount;

    dispatch(updateBalance(newBalance));
    dispatch(
      decrementBitcoinAvailability({
        name: selectedCryptoCurrency?.name ?? "",
        ticker: selectedCryptoCurrency?.ticker ?? "",
        availableCount: amount ?? 0,
      })
    );
    dispatch(
      addRecord({
        date: moment(),
        ticker: selectedCryptoCurrency?.ticker ?? "",
        name: selectedCryptoCurrency?.name ?? "",
        price: price,
        count: amount ?? 0,
        type: RecordType.SELL,
      })
    );
    BOMessage.success("Bitcoin was sold successful.");
  };

  return (
    <SellCurrencyWrapper>
      <div style={{ marginBottom: "1em" }}>
        <span style={{ color: "#7f838c" }}>Avbl </span>
        <span style={{ color: "white" }}>{`${availableCount.toFixed(8)} ${
          selectedCryptoCurrency?.ticker
        }`}</span>
      </div>
      <BOInputNumber
        label="Amount"
        value={amount?.toFixed(8)}
        placeholder={"0"}
        addonAfter={selectedCryptoCurrency?.ticker}
        style={{ width: "100%" }}
        onChange={handleAmountChange}
      />
      <BOInputNumber
        label="Total"
        value={receivedAmount.toFixed(2)}
        addonAfter={selectedCurrency}
        style={{ width: "100%" }}
        readOnly={true}
      />
      <BOSlider
        marks={sliderMarks}
        value={percentageOfCount}
        onChange={handlePercentageChange}
      />
      <BOButton
        style={{ width: "100%" }}
        content={`Sell ${selectedCryptoCurrency?.ticker}`}
        onClick={handleSellCryptoCurrency}
      />
    </SellCurrencyWrapper>
  );
};
