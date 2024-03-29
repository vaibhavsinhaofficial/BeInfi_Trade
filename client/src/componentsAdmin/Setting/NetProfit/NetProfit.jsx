import React, { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import MainTable from "../../AdminTable/MainTable";
import { Box } from "@mui/system";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import Loader from "../../Loader/Loader";


function NetProfit(authCreate, authRead, authUpdate, authDelete) {
  const tableHeading = [
    "Currency",
    "Total Deposits",
    "Total Payouts",
    "Total Settlements",
    "Total Chargebacks",
    "Total Refunds",
    "Total Charges",
    "Available Balance"
  ];

  const [tableData, setTableData] = useState([]);
  const [loading,setLoading] =useState(true);
  const auth = localStorage.getItem("admin");

  const ReadData = async () => {
    try {
      let formData = new FormData();

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/defaultProfit`,
        formData,
        config
      );
      setTableData(result.data.Currencieswise);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
    // setActive(14);
    // setActive2("All UPI");
    // setToggel(true);
  }, [""]);

  if(loading){
    return <Loader />
  }

  const TableBodyCom = () => {
    return (
      <>
        <TableBody>
          {Object.keys(tableData).length > 0 ? (
            tableData.map((item, index) => {
              return (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                    transition: "background-color 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#bfbfbf",
                      cursor: "auto"
                    },
                  }}
                  key={index}
                >
                    <TableCell align="center" style={{fontWeight: "700"}}>{item.Currency}</TableCell>
                    <TableCell align="center">{item.Deposite}</TableCell>
                    <TableCell align="center">{item.Payout}</TableCell>
                    <TableCell align="center">{item.Settle}</TableCell>
                    <TableCell align="center">{item.Chargeback}</TableCell>
                    <TableCell align="center">{item.Refund}</TableCell>
                    <TableCell align="center">{item.Charges}</TableCell>
                    <TableCell align="center">{item.AvailableBalance}</TableCell>
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
  return (
    <>
      <Box component="main" className="allcol restBody">
        <div className="row align-items-center">
          <h4 className="mb-3 headingAll">Net Profit</h4>
          <div className="col-6 mb-3">
            
          </div>
          <div className="col-3 mb-3">
          </div>
        </div>
        <MainTable tableHeading={tableHeading} TableBodyCom={TableBodyCom} />
      </Box>
    </>
  );
}

export default NetProfit;
