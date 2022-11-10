import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { BOSpin } from "../../shared/components/antd/Feedback/Spin/BOSpin";
import { CurrencySwitcher } from "./features/CurrencySwitcher/CurrencySwitcher";
import {
  fetchBalanceForEachCurrency,
  resetState,
  selectBalance,
  selectCurrency,
  selectLoading,
} from "./headerSlice";
import { HeaderWrapper } from "./styled";

export const Header = () => {
  const dispatch = useAppDispatch();
  const balance = useSelector(selectBalance);
  const selectedCurrency = useSelector(selectCurrency);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchBalanceForEachCurrency());
    };

    fetchData();

    return () => {
      dispatch(resetState());
    };

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div
        style={{ backgroundColor: "#16191e", borderBottom: "1px solid grey" }}
      >
        <BOSpin />
      </div>
    );
  }

  return (
    <HeaderWrapper>
      <span style={{ marginRight: "1em" }}>{`${balance.toFixed(
        2
      )} ${selectedCurrency.toUpperCase()}`}</span>
      <CurrencySwitcher />
    </HeaderWrapper>
  );
};
