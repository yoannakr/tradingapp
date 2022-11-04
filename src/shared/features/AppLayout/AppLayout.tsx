import { BuyCurrency } from "../../../sections/BuyCurrency/BuyCurrency";
import { BuySellHistory } from "../../../sections/BuySellHistory/BuySellHistory";
import { CurrenciesPairs } from "../../../sections/CurrenciesPairs/CurrenciesPairs";
import { SellCurrency } from "../../../sections/SellCurrency/SellCurrency";
import { Unknown } from "../../../sections/Unknown/Unknown";
import { Wallet } from "../../../sections/Wallet/Wallet";
import { Col, Row } from "../../components/antd";

export const AppLayout = () => {
  return (
    <>
      <Row>
        <Col span={8}>
          <BuySellHistory />
        </Col>
        <Col span={8}>
          <Row>
            <Unknown />
          </Row>
          <Row>
            <Col span={12}>
              <BuyCurrency />
            </Col>
            <Col span={12}>
              <SellCurrency />
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <CurrenciesPairs />
          </Row>
          <Row>
            <Wallet />
          </Row>
        </Col>
      </Row>
    </>
  );
};
