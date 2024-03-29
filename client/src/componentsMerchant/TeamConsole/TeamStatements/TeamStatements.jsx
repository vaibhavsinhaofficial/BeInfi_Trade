import React, {  useState } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../../componentsMerchant/config/baseUrl";
import axios from "axios";
import { useStateContext } from "../../../context/ContextProvider";
import "./statements.css";
let newdownloadStatement = [];

function TeamStatements() {
  const today = new Date();
  const year = today.getFullYear();
  const [yearVal, setYearVal] = useState(year);
  const { setDownloadStatement } = useStateContext();
 
  const statementData = async (val) => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      formData.append("month", val);
      formData.append("year", yearVal);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/statement`, formData, config);
      setDownloadStatement(result.data.data);
      newdownloadStatement = result.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h4 className="heading mx-3">Statements</h4>
      <Block1 setYearVal={setYearVal} yearVal={yearVal} />
      <br />
      <Block2 statementData={statementData} />
    </>
  );
}

const Block1 = ({ setYearVal, yearVal }) => {
  const date = [2017, 2018, 2019, 2020, 2021, 2022,2023];
  const [activ, setActive] = useState(2023);

  const increment = () => {
    if (yearVal <= 2022) {
      setActive(activ + 1);
      setYearVal(activ + 1);
    }
  };
  const deccrement = () => {
    if (yearVal > 2017) {
      setActive(activ - 1);
      setYearVal(activ - 1);
    }
  };

  return (
    <>
      <h6 className="mx-3">Statements Years</h6>
      <div className="containerShadow mx-3 d-flex  ">
        <div className=" d-flex secondDiv">
          <div className="firstArr">
            <img
              src="https://www.bankconnect.online/assets/merchants/img/previous.svg"
              height="37px"
              onClick={deccrement}
              alt="not found"
            />
          </div>
          {date.map((item, index) => {
            return (
              <div
                key={index}
                className={activ === item ? "yearblock active1" : "yearblock"}
                onClick={() => {
                  setActive(item);
                  setYearVal(item);
                }}
              >
                {item}
              </div>
            );
          })}
          <div className="secondArr">
            <img
              src="	https://www.bankconnect.online/assets/merchants/img/next.svg"
              alt=""
              height="37px"
              onClick={increment}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Block2 = ({ statementData }) => {
  const manthdata = [
    { name: "January", id: 1 },
    { name: "February", id: 2 },
    { name: "March", id: 3 },
    { name: "April", id: 4 },
    { name: "May", id: 5 },
    { name: "June", id: 6 },
    { name: "July", id: 7 },
    { name: "August", id: 8 },
    { name: "September", id: 9 },
    { name: "October", id: 10 },
    { name: "November", id: 11 },
    { name: "December", id: 12 },
  ];
  return (
    <div className="containerShadow ">
      {manthdata.map((item) => (
        <div
          className="d-flex justify-content-between m-3 monthBlock"
          key={item.id}
        >
          <h6>{item.name}</h6>
          <button
            className="download"
            onClick={() => {
              statementData(item.id);
            }}
          >
            <img
              src="https://www.bankconnect.online/assets/merchants/img/download-white.svg"
              alt="not"
              width="17px"
              className="mx-2"
            />
            <Link to="/bankconnect/DownloadRep" style={{ color: "#fff" }}>
              Download Report
            </Link>
          </button>
        </div>
      ))}
      <hr className="border" />
    </div>
  );
};

export default TeamStatements;
export { newdownloadStatement };
