import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../Currency/currency.css";
import "./transition.css";
import { top_transaction_today } from "../../../Api/Index";
import axios from "axios";
import { useStateContext } from "../../../context/ContextProvider";
import baseUrl from "../../config/baseUrl";
import orange from "./imgs/Orange.svg";
import blue from "./imgs/blue.svg";
import pink from "./imgs/pink.svg";
import green from "./imgs/green.svg";
import red from "./imgs/red.svg";

const ButtonBox = ({ name }) => {
  return (
    <>
      <button
        className={
          name === "FAILED"
            ? "failedRed"
            : name === "SUCCESS"
            ? "successGreen"
            : name=== "WAITING"
            ? "waitBlue"
            : name === "PENDING"
            ? "pendingOrange"
            : "refundPink"
        }
      >
        {name}
      </button>
    </>
  );
};

function Transition() {
  const [tab, setTab] = useState(3);
  const [todayData, setTodayData] = useState([]);
  const token = localStorage.getItem("user");
  const { dropdownMerchant } = useStateContext();
  useEffect(() => {
    todayApi();
  }, [tab]);

  const todayApi = async () => {
    try {
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      if (tab === 3) {
        formData.append("val", "today");
      } else if (tab === 2) {
        formData.append("val", "week");
      } else {
        formData.append("val", "month");
      }
      formData.append("id", dropdownMerchant)
      const { data } = await axios.post(`${baseUrl}/top_transaction_today`,formData,config)
      setTodayData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mainblock ">
        <div className="d-flex justify-content-between">
          <h6 className=" headingDiposite d-flex justify-content-between align-items-center">
            Top Transactions
          </h6>
          <div style={{ background: "#fff" }}>
            <button
              className={tab === 1 ? "btn1 active1" : "btn1"}
              onClick={() => setTab(1)}
            >
              Monthly
            </button>
            <button
              className={tab === 2 ? "btn1 active1" : "btn1"}
              onClick={() => setTab(2)}
            >
              Weekly
            </button>
            <button
              className={tab === 3 ? "btn1 active1" : "btn1"}
              onClick={() => setTab(3)}
            >
              Today
            </button>
          </div>
        </div>

        <TableComp todayData={todayData} />
      </div>
    </div>
  );
}

const TableComp = ({ todayData }) => {
  return (
    <>
      <TableContainer className="tableblockdash">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow></TableRow>
          </TableHead>
          <TableBody>
            {todayData?.length >= 1 ? (
              todayData.map((item, index) => {
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={index}
                  >
                    <TableCell component="th" scope="row">
                      {(item.status === "FAILED" || item.status === "0") ? (
                        <img
                          src={red}
                          alt=""
                          width="60px"
                        />
                      ) : (item.status === "SUCCESS" || item.status === "1") ? (
                        <img
                          src={green}
                          alt=""
                          width="60px"
                        />
                      ) : (item.status === "WAITING" || item.status === "2") ? (
                        <img
                          src={blue}
                          alt=""
                          width="60px"
                        />
                      ) : (item.status === "PENDING" || item.status === "3") ? (
                        <img
                          src={orange}
                          alt=""
                          width="60px"
                        />
                      ) : (
                        <img
                          src={pink}
                          alt=""
                          width="60px"
                        />
                      )}
                    </TableCell>
                    <TableCell style={{ fontWeight: "500" }}>
                      <span style={{fontWeight: "bold"}}>{item.customer_name}<br/>{item.payment_method} ({item.currency})</span>
                    </TableCell>
                    <TableCell style={{ fontWeight: "500" }}>
                      <span>{item.created_on}</span>
                    </TableCell>
                    <TableCell>
                      <span style={{ fontWeight: "500" }}>{item.amount}</span>
                    </TableCell>
                    <TableCell style={{ fontWeight: "500", color: "#f00" }}>
                      {(item.status === "FAILED" || item.status === "0") ? (
                        <ButtonBox name="FAILED" />
                      ) : (item.status === "SUCCESS" || item.status === "1") ? (
                        <ButtonBox name="SUCCESS" />
                      ) : (item.status === "WAITING" || item.status === "2") ? (
                        <ButtonBox name="WAITING" />
                      ) : (item.status === "PENDING" || item.status === "3") ? (
                        <ButtonBox name="PENDING" />
                      ) : (
                        <ButtonBox name="REFUND" />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell style={{ fontWeight: "600" }} align="center">
                  <h5>No Data Found</h5>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Transition;