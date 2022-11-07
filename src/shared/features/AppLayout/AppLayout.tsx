import { BuyCurrency } from "../../../sections/BuyCurrency/BuyCurrency";
import { BuySellHistory } from "../../../sections/BuySellHistory/BuySellHistory";
import { CurrenciesPairs } from "../../../sections/CurrenciesPairs/CurrenciesPairs";
import { SellCurrency } from "../../../sections/SellCurrency/SellCurrency";
import { Price } from "../../../sections/Price/Price";
import { Wallet } from "../../../sections/Wallet/Wallet";
import { Col, Row } from "../../components/antd";

export const AppLayout = () => {
  return (
    <Row>
      <Col md={4} style={{ border: "1px solid green" }}>
        <BuySellHistory />
      </Col>
      <Col
        flex={"auto"}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Row style={{ height: "100%" }}>
          <Price />
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
      <Col md={6}>
        <Row>
          <CurrenciesPairs />
        </Row>
        <Row>
          <Wallet />
        </Row>
      </Col>
    </Row>
  );
};
