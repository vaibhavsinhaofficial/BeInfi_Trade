// import React, { useState, useEffect } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import baseUrl from "../../../componentsMerchant/config/baseUrl";
// import "./currency.css";
// import axios from "axios";
// import rupee from "./imgs/merchantcurrency/rupee.svg";
// import cny from "./imgs/merchantcurrency/cny.svg";
// import baht from "./imgs/merchantcurrency/baht.svg";
// import clp from "./imgs/merchantcurrency/clp.svg";
// import dollar from "./imgs/merchantcurrency/dollar.svg";
// import dong from "./imgs/merchantcurrency/dong.svg";
// import indo from "./imgs/merchantcurrency/indo.svg";
// import mxn from "./imgs/merchantcurrency/mxn.svg";
// import myr from "./imgs/merchantcurrency/myr.svg";
// import php from "./imgs/merchantcurrency/php.svg";
// import pen from "./imgs/merchantcurrency/sol.svg";
// import gtq from "./imgs/merchantcurrency/gtq.svg";
// import crc from "./imgs/merchantcurrency/crc.svg";
// import brl from "./imgs/merchantcurrency/brl.svg";
// import pkr from "./imgs/merchantcurrency/pkr.svg";
// import krw from "./imgs/merchantcurrency/krw.svg";
// import aed from "./imgs/merchantcurrency/aed.svg";
// import azn from "./imgs/merchantcurrency/azn.svg";
// import bdt from "./imgs/merchantcurrency/bdt.svg";
// import bif from "./imgs/merchantcurrency/bif.svg";
// import cop from "./imgs/merchantcurrency/cop.svg";
// import eur from "./imgs/merchantcurrency/eur.svg";
// import ghc from "./imgs/merchantcurrency/ghc.svg";
// import jpy from "./imgs/merchantcurrency/jpy.svg";
// import kes from "./imgs/merchantcurrency/kes.svg";
// import kzt from "./imgs/merchantcurrency/kzt.svg";
// import lak from "./imgs/merchantcurrency/lak.svg";
// import mdl from "./imgs/merchantcurrency/mdl.svg";
// import ngn from "./imgs/merchantcurrency/ngn.svg";
// import rub from "./imgs/merchantcurrency/rub.svg";
// import tryy from "./imgs/merchantcurrency/try.svg";
// import tzshs from "./imgs/merchantcurrency/tzshs.svg";
// import uah from "./imgs/merchantcurrency/uah.svg";
// import ugx from "./imgs/merchantcurrency/ugx.svg";
// import usdt from "./imgs/merchantcurrency/usdt.svg";
// import uzs from "./imgs/merchantcurrency/uzs.svg";
// import xaf from "./imgs/merchantcurrency/xaf.svg";
// import zar from "./imgs/merchantcurrency/zar.svg";
// import zmw from "./imgs/merchantcurrency/zmw.svg";
// import ars from "./imgs/merchantcurrency/ars.svg";
// import sgd from "./imgs/merchantcurrency/sgd.svg";
// import gbp from "./imgs/merchantcurrency/gbp.svg";
// import { useStateContext } from "../../../context/ContextProvider";

// function Currency() {
//   const [tab, setTab] = useState(3);

//   const [todayData, setTodayData] = useState([]);
//   const { dropdownMerchant } = useStateContext();

//   useEffect(() => {
//     todayApi();
//   }, [dropdownMerchant,tab]);

//   const todayApi = async () => {
//     try {
//       const auth = localStorage.getItem("user");
//       let formData = new FormData();
//       formData.append("id", dropdownMerchant)

//       if (tab === 3) {
//         formData.append("today", 1);
//       } else if (tab === 2) {
//         formData.append("week", 2);
//       } else {
//         formData.append("month", 3);
//       }

//       const config = {
//         headers: {
//           "content-type": "multipart/form-data",
//           Authorization: `Bearer ${auth}`,
//         },
//       };

//       let result = await axios.post(`${baseUrl}/dbycurrency`, formData, config);
//       setTodayData(result.data.data);
//       //console.log("currency:",result.data.data)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div className="mainblock ">
//         <div className="d-flex justify-content-between align-items-center">
//           <h6 className="headingDiposite">Deposits By Currency</h6>
//           <div style={{ background: "#fff" }}>
//             <button
//               className={tab === 1 ? "btn1 active1" : "btn1"}
//               onClick={() => setTab(1)}
//             >
//               Monthly
//             </button>
//             <button
//               className={tab === 2 ? "btn1 active1" : "btn1"}
//               onClick={() => setTab(2)}
//             >
//               Weekly
//             </button>
//             <button
//               className={tab === 3 ? "btn1 active1" : "btn1"}
//               onClick={() => setTab(3)}
//             >
//               Today
//             </button>
//           </div>
//         </div>

//         <TableComp todayData={todayData} />
//       </div>
//     </>
//   );
// }

// const TableComp = ({ todayData }) => {
//   return (
//     <>
//       <TableContainer className="tableblockdash">
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell></TableCell>
//               <TableCell className="boldword">Currency</TableCell>
//               <TableCell>Deposit</TableCell>
//               <TableCell>Payout</TableCell>
//               <TableCell>Settlement</TableCell>
//               <TableCell>Net Balance</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {todayData
//               ? todayData.map((item, index) => {
//                   return (
//                     <TableRow
//                       sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                       key={index}
//                     >
//                       <TableCell component="th" scope="row">
//                       {
//                         item.currency === "INR"
//                         ? <img src={rupee} alt="ruppe" width="70px" />
//                         : item.currency === "CNY"
//                         ? <img src={cny} alt="yuan" width="70px" />
//                         : item.currency === "IDR"
//                         ? <img src={indo} alt="rupiah" width="70px" />
//                         : item.currency === "THB"
//                         ? <img src={baht} alt="baht" width="70px" />
//                         : item.currency === "VND"
//                         ? <img src={dong} alt="dong" width="70px" />
//                         : item.currency === "USD"
//                         ? <img src={dollar} alt="dollar" width="70px" />
//                         : item.currency === "PHP"
//                         ? <img src={php} alt="php" width="70px" />
//                         : item.currency === "MYR"
//                         ? <img src={myr} alt="myr" width="70px" />
//                         : item.currency === "CLP"
//                         ? <img src={clp} alt="php" width="70px" />
//                         : item.currency === "MXN"
//                         ? <img src={mxn} alt="php" width="70px" />
//                         : item.currency === "PEN"
//                         ? <img src={pen} alt="pen" width="70px" />
//                         : item.currency === "GTQ"
//                         ? <img src={gtq} alt="gtq" width="70px" />
//                         : item.currency === "CRC"
//                         ? <img src={crc} alt="crc" width="70px" />
//                         : item.currency === "BRL"
//                         ? <img src={brl} alt="brl" width="70px" />
//                         : item.currency === "PKR"
//                         ? <img src={pkr} alt="pkr" width="70px" />
//                         : item.currency === "KRW"
//                         ? <img src={krw} alt="krw" width="70px" />
//                         : item.currency === "AED"
//                         ? <img src={aed} alt="aed" width="70px" />
//                         : item.currency === "AZN"
//                         ? <img src={azn} alt="azn" width="70px" />
//                         : item.currency === "BDT"
//                         ? <img src={bdt} alt="bdt" width="70px" />
//                         : item.currency === "BIF"
//                         ? <img src={bif} alt="bif" width="70px" />
//                         : item.currency === "COP"
//                         ? <img src={cop} alt="cop" width="70px" />
//                         : item.currency === "EUR"
//                         ? <img src={eur} alt="eur" width="70px" />
//                         : item.currency === "GHC"
//                         ? <img src={ghc} alt="ghc" width="70px" />
//                         : item.currency === "JPY"
//                         ? <img src={jpy} alt="jpy" width="70px" />
//                         : item.currency === "KES"
//                         ? <img src={kes} alt="kes" width="70px" />
//                         : item.currency === "KZT"
//                         ? <img src={kzt} alt="kzt" width="70px" />
//                         : item.currency === "LAK"
//                         ? <img src={lak} alt="lak" width="70px" />
//                         : item.currency === "MDL"
//                         ? <img src={mdl} alt="mdl" width="70px" />
//                         : item.currency === "NGN"
//                         ? <img src={ngn} alt="ngn" width="70px" />
//                         : item.currency === "RUB"
//                         ? <img src={rub} alt="rub" width="70px" />
//                         : item.currency === "TRY"
//                         ? <img src={tryy} alt="try" width="70px" />
//                         : item.currency === "TZSHS"
//                         ? <img src={tzshs} alt="tzshs" width="70px" />
//                         : item.currency === "UAH"
//                         ? <img src={uah} alt="uah" width="70px" />
//                         : item.currency === "UGX"
//                         ? <img src={ugx} alt="ugx" width="70px" />
//                         : item.currency === "USDT"
//                         ? <img src={usdt} alt="usdt" width="70px" />
//                         : item.currency === "UZS"
//                         ? <img src={uzs} alt="uzs" width="70px" />
//                         : item.currency === "XAF"
//                         ? <img src={xaf} alt="xaf" width="70px" />
//                         : item.currency === "ZAR"
//                         ? <img src={zar} alt="zar" width="70px" />
//                         : item.currency === "SGD"
//                         ? <img src={sgd} alt="SGD" width="70px" />
//                         : item.currency === "ARS"
//                         ? <img src={ars} alt="ARS" width="70px" />
//                         : item.currency === "GBP"
//                         ? <img src={gbp} alt="GBP" width="70px" />
//                         : item.currency === "ZMW"
//                         ? <img src={zmw} alt="zmw" width="70px" />
//                         : ""
//                       }
//                       </TableCell>
//                       <TableCell style={{textAlign: "center"}}>{item.currency}</TableCell>
//                       <TableCell style={{textAlign: "center"}}>{item.depositSum}</TableCell>
//                       <TableCell style={{textAlign: "center"}}>{item.payoutSum}</TableCell>
//                       <TableCell style={{textAlign: "center"}}>{item.settlementSum}</TableCell>
//                       <TableCell style={{textAlign: "center"}}>{item.net}</TableCell>
//                     </TableRow>
//                   );
//                 })
//               : ""}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// export default Currency;



import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import baseUrl from "../../../componentsMerchant/config/baseUrl";
import "./currency.css";
import axios from "axios";
import { useStateContext } from "../../../context/ContextProvider";

const currencyImages = {
  INR: require("./imgs/merchantcurrency/rupee.svg").default,
  CNY: require("./imgs/merchantcurrency/cny.svg").default,
  IDR: require("./imgs/merchantcurrency/indo.svg").default,
  THB: require("./imgs/merchantcurrency/baht.svg").default,
  VND: require("./imgs/merchantcurrency/dong.svg").default,
  USD: require("./imgs/merchantcurrency/dollar.svg").default,
  PHP: require("./imgs/merchantcurrency/php.svg").default,
  MYR: require("./imgs/merchantcurrency/myr.svg").default,
  CLP: require("./imgs/merchantcurrency/clp.svg").default,
  MXN: require("./imgs/merchantcurrency/mxn.svg").default,
  PEN: require("./imgs/merchantcurrency/sol.svg").default,
  GTQ: require("./imgs/merchantcurrency/gtq.svg").default,
  CRC: require("./imgs/merchantcurrency/crc.svg").default,
  BRL: require("./imgs/merchantcurrency/brl.svg").default,
  PKR: require("./imgs/merchantcurrency/pkr.svg").default,
  KRW: require("./imgs/merchantcurrency/krw.svg").default,
  AED: require("./imgs/merchantcurrency/aed.svg").default,
  AZN: require("./imgs/merchantcurrency/azn.svg").default,
  BDT: require("./imgs/merchantcurrency/bdt.svg").default,
  BIF: require("./imgs/merchantcurrency/bif.svg").default,
  COP: require("./imgs/merchantcurrency/cop.svg").default,
  EUR: require("./imgs/merchantcurrency/eur.svg").default,
  GHC: require("./imgs/merchantcurrency/ghc.svg").default,
  JPY: require("./imgs/merchantcurrency/jpy.svg").default,
  KES: require("./imgs/merchantcurrency/kes.svg").default,
  KZT: require("./imgs/merchantcurrency/kzt.svg").default,
  LAK: require("./imgs/merchantcurrency/lak.svg").default,
  MDL: require("./imgs/merchantcurrency/mdl.svg").default,
  NGN: require("./imgs/merchantcurrency/ngn.svg").default,
  RUB: require("./imgs/merchantcurrency/rub.svg").default,
  TRY: require("./imgs/merchantcurrency/try.svg").default,
  TZSHS: require("./imgs/merchantcurrency/tzshs.svg").default,
  UAH: require("./imgs/merchantcurrency/uah.svg").default,
  UGX: require("./imgs/merchantcurrency/ugx.svg").default,
  USDT: require("./imgs/merchantcurrency/usdt.svg").default,
  UZS: require("./imgs/merchantcurrency/uzs.svg").default,
  XAF: require("./imgs/merchantcurrency/xaf.svg").default,
  ZAR: require("./imgs/merchantcurrency/zar.svg").default,
  SGD: require("./imgs/merchantcurrency/sgd.svg").default,
  ARS: require("./imgs/merchantcurrency/ars.svg").default,
  GBP: require("./imgs/merchantcurrency/gbp.svg").default,
  ZMW: require("./imgs/merchantcurrency/zmw.svg").default,
};

const Currency = () => {
  const [tab, setTab] = useState(3);
  const [todayData, setTodayData] = useState([]);
  const { dropdownMerchant } = useStateContext();

  useEffect(() => {
    todayApi();
  }, [dropdownMerchant,tab]);

  const todayApi = async () => {
    try {
      const auth = localStorage.getItem("user");
      let formData = new FormData();
      formData.append("id", dropdownMerchant);
  
      if (tab === 3) {
        formData.append("today", 1);
      } else if (tab === 2) {
        formData.append("week", 2);
      } else {
        formData.append("month", 3);
      }
  
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
  
      let result = await axios.post(`${baseUrl}/dbycurrency`, formData, config);
      
      // console.log("Dropdown Merchant:", dropdownMerchant);
      // console.log("API Result:", result.data.data);
  
      // // Filter the result data based on the selected dropdownMerchant
      // if (dropdownMerchant !== "") {
      //   result.data.data = result.data.data.filter(item => item.id === dropdownMerchant);
      // }
  
      setTodayData(result.data.data);
      // console.log(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="mainblock">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="headingDeposit">Deposits By Currency</h6>
        <div style={{ background: "#fff" }}>
          <button className={tab === 1 ? "btn1 active1" : "btn1"} onClick={() => setTab(1)}>Monthly</button>
          <button className={tab === 2 ? "btn1 active1" : "btn1"} onClick={() => setTab(2)}>Weekly</button>
          <button className={tab === 3 ? "btn1 active1" : "btn1"} onClick={() => setTab(3)}>Today</button>
        </div>
      </div>
      <TableComp todayData={todayData} />
    </div>
  );
};

const TableComp = ({ todayData }) => {
  return (
    <TableContainer className="tableblockdash">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell className="boldword">Currency</TableCell>
            <TableCell>Deposit</TableCell>
            <TableCell>Payout</TableCell>
            <TableCell>Settlement</TableCell>
            <TableCell>Net Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todayData && todayData.map((item, index) => (
            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                <img src={currencyImages[item.currency]} alt={item.currency} width="70px" />
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>{item.currency}</TableCell>
              <TableCell style={{ textAlign: "center" }}>{item.depositSum}</TableCell>
              <TableCell style={{ textAlign: "center" }}>{item.payoutSum}</TableCell>
              <TableCell style={{ textAlign: "center" }}>{item.settlementSum}</TableCell>
              <TableCell style={{ textAlign: "center" }}>{item.net}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Currency;
