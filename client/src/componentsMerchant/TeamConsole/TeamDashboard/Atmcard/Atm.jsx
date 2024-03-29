import React, { useEffect, useState } from "react";
import "./atm.css";
import AOS from "aos";
import "aos/dist/aos.css";
import first from "./imgs/greenAtm.svg"
import second from "./imgs/orangAtm.svg"
import third from "./imgs/darkBlue.svg"
import forth from "./imgs/purpleAtm.svg"
import fifth from "./imgs/redAtm.svg"
import sixth from "./imgs/pinkAtm.svg"
import seventh from "./imgs/ligrtBlueAtm.svg"
import eightth from "./imgs/atm1.svg"
import nineth from "./imgs/shadowcard.svg"
import tenth from "./imgs/changeAtm.svg";
import international from "./imgs/international.svg"
import cardBotttom from "./imgs/cardBotttom.svg";

function Atm({ atmData }) {
  const [cardflip, setCardflip] = useState(0);
  useEffect(() => {
    AOS.init();
  }, [cardflip]);

  const changeFlip = () => {
    if (cardflip === 7) {
      setCardflip(0);
    } else {
      setCardflip(cardflip + 1);
    }
  };

  const AtmCard = ({ flip, bgImg, name,holderName ,amount,id}) => {
    const d = new Date();
  
  let date = d.getMonth() + 1 + '/' + d.getFullYear().toString().substr(-2);
    return (
      <div className="mainAtmDiv">
        <div
          className="atmcard card"
          data-aos={flip}
          style={{
            backgroundImage: `url(${bgImg})`,
          }}
        >
          <div className="container">
            <h5
              className="my-3"
              style={{ fontSize: "16px", fontWeight: "700" }}
            >
              {name}
            </h5>
            <div style={{ fontSize: "1.2rem" }}>{amount}</div>
            <br />
            <br />
            <div
              className="text-end  "
              style={{ fontSize: "16px", fontWeight: "700" }}
            >
              * * ** {id}
            </div>
            <br />
            <div className="d-flex justify-content-between ">
              <div className="mx-3">
                <div className="holdername">Month Date</div>
                <div>{date}</div>
              </div>
              <div className="mx-5">
                <div className="holdername">Merchant Name</div>
                <div className="mName" style={{fontSize:"14px"}}>{holderName}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <img src={cardBotttom} alt="" className="shadowimg" />
          <img
            src={tenth}
            alt=""
            className=" changeatm "
            onClick={changeFlip}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      {cardflip === 0 ? (
        <AtmCard
          bgImg={first}
          name="Deposits"
          flip="flip-up"
          holderName={atmData.name}
          amount={atmData.deposit}
          id={atmData.id}
        />
      ) : cardflip === 1 ? (
        <AtmCard
          flip="flip-up"
          bgImg={second}
          name="Payouts"
          holderName={atmData.name}
          amount={atmData.payout}
          id={atmData.id}
        />
      ) : cardflip === 2 ? (
        <AtmCard
          flip="flip-up"
          bgImg={third}
          name="Local Settelments"
          holderName={atmData.name}
          amount={atmData.local_settlement}
          id={atmData.id}
        />
      ) : cardflip === 3 ? (
        <AtmCard
          flip="flip-up"
          bgImg={international}
          name="International Settelments"
          holderName={atmData.name}
          amount={atmData.international_settlement}
          id={atmData.id}
        />
      ) : cardflip === 4 ? (
        <AtmCard
          flip="flip-up"
          bgImg={forth}
          name="Comission & Charges"
          holderName={atmData.name}
          amount={atmData.commission}
          id={atmData.id}
        />
      ) : cardflip === 5 ? (
        <AtmCard
          flip="flip-up"
          bgImg={fifth}
          name="Rolling Reserve"
          holderName={atmData.name}
          amount={atmData.rolling_reverse}
          id={atmData.id}
        />
      ) : cardflip === 6 ? (
        <AtmCard
          flip="flip-up"
          bgImg={sixth}
          name="Refund and Checkback"
          holderName={atmData.name}
          amount={atmData.refund_nd_chargeback}
          id={atmData.id}
        />
      ) : cardflip === 7 ? (
        <AtmCard
          flip="flip-up"
          bgImg={seventh}
          name="Available Balance"
          holderName={atmData.name}
          amount={atmData.available_balance}
          id={atmData.id}
        />
      ) : (
        <AtmCard
          bgImg={eightth}
          flip="flip-up"
          name="Deposits"
          holderName={atmData.name}
          amount={atmData.deposit}
          id={atmData.id}
        />
      )}
    </div>
  );
}

export default Atm;
