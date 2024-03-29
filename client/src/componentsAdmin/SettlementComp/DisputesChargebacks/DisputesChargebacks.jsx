import React, { useEffect, useState } from 'react'
import Card from '../../../commonAdminComp/Card/Card'
import FilterDateMax from '../../../commonAdminComp/filterDateMax/FilterDateMax'
import TableComp from './TableComp'
import styles from './style.module.css'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PaginationComp from '../../../commonAdminComp/Pagination/PaginationComp'
import axios from 'axios'
import baseUrl from '../../config/baseUrl'
import SearchItem from '../../../commonAdminComp/SearchItem/SearchItem'
import AddTransaction from '../BankDeposit/AddTransaction'
import * as XLSX from "xlsx";
import { Link } from 'react-router-dom'
import EnterTransaction from './EnterTransaction'
function DisputesChargebacks({authCreate, authRead, authUpdate, authDelete}) {
  const [page,setPage]=useState(1)
  const [totalPage,setTotalPage]=useState(1)
  const [tableBodyData,setTableBodyData] = useState([])
  const [date,setDate] = useState('')
  const [to,setTo] = useState('')
  const [from,setFrom] = useState('')
  const [searchItem,setSearchItem] = useState('')
  const [xlsxData,setXlData] = useState([]);
  const [message, setMessage] = useState("")
  const [cardData, setCardData] = useState([]);
  const auth = localStorage.getItem("admin");
  const [loading,setLoading] =useState(true);

    const fetchData = async()=>{
      try {
      const values = {pageNumber:page,date,to,from,searchItem}
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      const {data} = await axios.post(`${baseUrl}/api/settelment/disputesChargeback`, values, config)
      setTableBodyData(data.result)
      setMessage(data.message)
      setTotalPage(data.numOfPages)
      setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }

    const disputeCards = async () =>{
      const auth = localStorage.getItem("admin");
      const values = {date,to,from,searchItem }
      
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
  
      axios
        .post(`${baseUrl}/DisputesChargebackCardData`, values, config)
        .then((res) => {
          // console.log(res);
          setCardData( res?.data.data);
        })
        .catch((err) => console.log(err));
    }
    
    useEffect(()=>{
      fetchData()
      disputeCards()
    },[page,date,to,from,searchItem, message])

    const downloadExl = () => {
      const auth = localStorage.getItem("admin");
      const values = {date,to,from,searchItem }
      
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
  
      axios.post(`${baseUrl}/downloadDisputeChargeback`, values, config)
      .then((res) => {
        const workSheet = XLSX.utils.json_to_sheet(res.data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "DisputeChargeback");
        // Buffer
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        // Binary String
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        // Download
        XLSX.writeFile(workBook, "DisputeChargeback.xlsx");
      })
      .catch((err) => console.log(err));
    }

  const tableHeading = ['Merchant Name','Received Date','Currency','Amount','Charges/Fees','Net Amount','In USD','Bank Name','Customer Name','Reason','Mode','Authorizer','Net Amount','Action']

  return (
    
    <section> 
    <h4 style={{fontWeight:"bold",marginBottom:"20px"}}>Disputes/Chargebacks</h4>
    <Card carddata={cardData}/>
    {/* FILTER SECTION */}
    <div className="row align-items-center justify-content-end mt-3 mb-3">
      <div className="col-9 row align-items-center justify-content-around">
        <div className='col-4'> <SearchItem searchItem={searchItem} setSearchItem={setSearchItem}  /> </div>
        <div className="col-3 centerDiv"><FilterDateMax setDate={setDate} setTo={setTo} setFrom={setFrom}/></div>
        {/* <div className="col-3 centerDiv"> <AddTransaction /></div> */}
        <div className="col-3 centerDiv">
          {
            authCreate ? (
              <EnterTransaction fetchData={fetchData} />
            ) : null
          }
        </div>
        <div className="col-2 centerDiv"> <button className={styles.addTransaction} onClick={downloadExl}><ArrowDownwardIcon  />Download</button></div>
      </div>
    </div>
     {/* FILTER SECTION END*/}
    <TableComp setXlData={setXlData} tableHeading={tableHeading} tableBodyData={tableBodyData} fetchData={fetchData} authRead={authRead} loading={loading} />
    <PaginationComp
          setPage={setPage}
          page={page}
          totalPage={totalPage}
          message={message}
        />
    </section>
    
  
  )
}

export default DisputesChargebacks