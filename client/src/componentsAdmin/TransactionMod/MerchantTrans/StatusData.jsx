import React, { useEffect, useState } from "react";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

function StatusData() {

  const [tableData, setTableData] = useState([]);
  let { order_no } = useParams();
  const [loading,setLoading] =useState(true);

  const fetchData = async () => {
    try {
      let formData = new FormData();
      formData.append("order_no", order_no);
      let result = await axios.post(
        `${baseUrl}/statusApi`,
        formData
      );
      setTableData(result.data.result);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => { 
    fetchData();
  }, []);

  if(loading){
    return <Loader />
  }

  return (
    <>
      <table className="table table-bordered" style={{border: "1px solid #000"}}>
        <tbody>
          <tr>
            <th colspan="2" style={{textAlign: "center", background: "#456b7b", color: "#fff", fontWeight: "700"}}><i className="fa fa-file-text-o" style={{fontSize: "25px", color: "#fff"}}></i>&nbsp;Merchant Transaction Status For Order NO:&nbsp;
                <span style={{textDecoration: "underline"}}>{order_no}</span>
            </th>
            <td style={{textAlign: "center", background: "#456b7b", color: "#fff", fontWeight: "700"}}>
              <Link to="/bankconnect/MerchantTrans">
                <button className="btn-sm" style={{ 
                    background: "#fff",
                    float: "right",
                    color: "#000",
                    fontWeight: "700"
                  }}>
                  BACK
                </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{overflowX: "auto"}}>
        <table className="table table-bordered" style={{border: "1px solid #000"}}>
            <tbody>
                <tr style={{whiteSpace: "nowrap"}}>
                    <th>DATE/TIME</th>
                    <th>DESCRIPTION</th>
                    <th>BEFORE CHANGE</th>
                    <th>BANK STATUS</th>
                    <th>STATUS CODE</th>
                    <th>CHANGE STATUS</th>
                    <th>CHANGED BY</th>
                </tr>
                    {Object.keys(tableData).length > 0 ? (
                      tableData.map((item, index) => {
                        return (
                            <>
                              <tr>
                                  <td style={{whiteSpace: 'nowrap'}}>
                                      {item.creation_date}
                                  </td>
                                  <td>
                                      {item.order_description}
                                  </td>
                                  <td>
                                      {item.previous_status}
                                  </td>
                                  <td>
                                      {item.bank_status}
                                  </td>
                                  <td>
                                      {item.status_code}
                                  </td>
                                  <td>
                                      {item.current_status}
                                  </td>
                                  <td>
                                      {item.changed_by}
                                  </td>
                              </tr>
                            </>
                        );
                      })
                    ) : (
                      <tr>
                        <td align="center" colSpan={8}>
                          <h4>No Record Found</h4>
                        </td>
                      </tr>
                    )}
            </tbody>
        </table>
      </div>
    </>
  )
}

export default StatusData