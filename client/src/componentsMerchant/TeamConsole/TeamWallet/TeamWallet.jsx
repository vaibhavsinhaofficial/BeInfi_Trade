import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PaginationComp from "../../../commonAdminComp/Pagination/PaginationComp";
import MainTable from "../../../componentsAdmin/AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import FilterDate from "../../../commonCompMerchant/filterDate/FilterDate";
import { useStateContext } from "../../../context/ContextProvider";
import SearchBox from "../../../commonCompMerchant/SearchBox/Search";
import Loader from "../../Loader/Loader";
import * as XLSX from "xlsx";
import white from "./downloadwhite.svg"

function TeamWallet() {
  const tableHeading = [
    "Merchant",
    "Order ID",
    "Current Wallet",
    "Update Wallet",
    "Action",
    "Effective Amt",
    "Remarks",
    "Authorizer",
    "Create",
  ];

  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [limitVal, setLimitVal] = useState(10);
  const [date, setDate] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [orderNumber, setorderNumber] = useState("");
  const [message, setMessage] = useState("");
  const auth = localStorage.getItem("user");
  const { dropdownMerchant } = useStateContext();
  const [loading,setLoading] =useState(true)

  const ReadData = async () => {
    try {
      let values = {
        page: page,
        limit: limitVal,
        to: to,
        from: from,
        date: date,
        id: dropdownMerchant,
        orderid: orderNumber
      }
      const config = {
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/teammerchantWalletLogs`,
        values,
        config
      );
      setMessage(result.data.message);
      setTableData(result.data.result);
      setTotalPage(Number(result.data.totalPages));
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const downloadExl = () => {
    const auth = localStorage.getItem("user");
    let values = {
      to: from,
      from: to,
      date: date,
      id: dropdownMerchant,
      orderid: orderNumber
    }
    const config = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${auth}`,
      },
    };
    axios.post(`${baseUrl}/walletLogsDownload`, values, config)
      .then((res) => {
        const workSheet = XLSX.utils.json_to_sheet(res.data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "WalletLogs");
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        const randomNumber = Math.floor(Math.random() * 1000);
        const fileName = `WalletLogs_${randomNumber}_${Date.now()}.xlsx`;
        XLSX.writeFile(workBook, fileName);
      })
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    ReadData();
  }, [page, limitVal, date, from, to, orderNumber]);

  const TableBodyCom = () => {
    return (
      <>
        <TableBody>
          {Object.keys(tableData).length > 0 ? (
            tableData.map((item, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell align="center">
                    <div className="mName">
                      &#40;{item.merchant_id}	&#41;&nbsp;{item.name}
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.order_id}</TableCell>
                  <TableCell align="center">{item.current_wallet}</TableCell>
                  <TableCell align="center">{item.update_wallet_tot}</TableCell>
                  <TableCell align="center">{item.current_action === 1 ? "ADD" : "SUB"}</TableCell>
                  <TableCell align="center">{item.effective_amt}</TableCell>
                  <TableCell align="center">{item.remark}</TableCell>
                  <TableCell align="center" style={{whiteSpace: "nowrap"}}>{item.firstname}&nbsp;{item.lastname}</TableCell>
                  <TableCell align="center">{item.created_on}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={8}>
                <h4>No Data Found</h4>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </>
    );
  };
  if(loading){
    return <Loader />
  }
  return (
    <>
      <Box component="main" className="allcol restBody">
        <div className="row align-items-center">
          <h4 className="headingAll">Wallet Logs</h4>
          <div className="row justify-content-between align-items-center mb-3">
            <div className="col-5">
              <SearchBox orderNumber={orderNumber} setorderNumber={setorderNumber}/>
            </div>
            <div className="col-5">
              <FilterDate setDate={setDate} setFrom={setFrom} setTo={setTo} />
            </div>
            <div className="col-2">
              <button className="downloadDeposite" onClick={downloadExl}><img src={white} alt="" width="20px" className="mx-2" />Download Logs</button>
            </div>
          </div>
        </div>
        <MainTable tableHeading={tableHeading} TableBodyCom={TableBodyCom} />
        <PaginationComp
          setPage={setPage}
          page={page}
          totalPage={totalPage}
          message={message}
        />
      </Box>
    </>
  );
}

export default TeamWallet;
