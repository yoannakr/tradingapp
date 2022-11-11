import { BuyCurrency } from "../../../sections/BuyCurrency/BuyCurrency";
import { History } from "../../../sections/History/History";
import { CurrenciesPairs } from "../../../sections/CurrenciesPairs/CurrenciesPairs";
import { SellCurrency } from "../../../sections/SellCurrency/SellCurrency";
import { Price } from "../../../sections/Price/Price";
import { Wallet } from "../../../sections/Wallet/Wallet";
import { Col, Row } from "../../components/antd";

export const AppLayout = () => {
  return (
    <Row style={{ height: "100%" }}>
      <Col xs={24} sm={24} md={7}>
        <History />
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
          <Col xs={24} sm={24} md={12}>
            <BuyCurrency />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <SellCurrency />
          </Col>
        </Row>
      </Col>
      <Col
        xs={24}
        sm={24}
        md={5}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Row>
          <CurrenciesPairs />
        </Row>
        <Row style={{ height: "100%" }}>
          <Wallet />
        </Row>
      </Col>
    </Row>
  );
};
