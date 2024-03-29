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
import * as XLSX from "xlsx";
import FilterMerchant from '../../../commonAdminComp/FilterMerchant/FilterMerchant'

function LocalPayouts() {
  const [page,setPage]=useState(1)
  const [totalPage,setTotalPage]=useState(1)
  const [tableBodyData,setTableBodyData] = useState([])
  const [date,setDate] = useState('')
  const [to,setTo] = useState('')
  const [from,setFrom] = useState('')
  const [searchItem,setSearchItem] = useState('');
  const [message, setMessage] = useState("");
  const [merchantSelect, setMerchantSelect] = useState("");
  const [status, setStatus] = useState("");
  const [currency, setCurrency] = useState("");
  const auth = localStorage.getItem("admin");
  const [loading,setLoading] =useState(true);
  const [cardData, setCardData] = useState([]);
  const [currencyName, setCurrencyName] = useState([])

    const fetchData = async()=>{
      try {
      const values = {pageNumber:page,date,to,from,searchItem, merchantSelect, status, currency}
      let formData = new FormData();
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
      const {data} = await axios.post(`${baseUrl}/api/settelment/localPayouts`, values, config)
      let result = await axios.post(
        `${baseUrl}/allCurrency`,
        formData,
        config
      );
      setTableBodyData(data.result)
      setTotalPage(data.totalPages)
      setMessage(data.message)
      setLoading(false)
      setCurrencyName(result.data.Data);
      } catch (error) {
        console.log(error);
      }
    }

    const localPayoutsCards = async()=>{
      const auth = localStorage.getItem("admin");
      const values = {pageNumber:page,date,to,from,searchItem, merchantSelect, status, currency}
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
  
      axios
        .post(`${baseUrl}/localPayoutsCards`, values, config)
        .then((res) => {
          // console.log(res);
          setCardData( res?.data.data);
        })
        .catch((err) => console.log(err));
    }

    useEffect(()=>{
      fetchData()
      localPayoutsCards()
    },[page,date,to,from,searchItem, message, merchantSelect, status, currency])

    const downloadExl = () => {
      const auth = localStorage.getItem("admin");
      const values = {pageNumber:page,date,to,from,searchItem, merchantSelect, status, currency}
      const config = {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      };
  
      axios.post(`${baseUrl}/downloadLocalPayouts`, values, config)
      .then((res) => {
        const workSheet = XLSX.utils.json_to_sheet(res.data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "LocalPayouts");
        // Buffer
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        // Binary String
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        // Download
        XLSX.writeFile(workBook, "LocalPayouts.xlsx");
      })
      .catch((err) => console.log(err));
    }

     const tableHeading = ['AC.Type','Bank','Payout Id','Customer Payout Id','Merchant','Status','Message','UTR','Trx Type','Payee','Credit Acc','IFSC','Amount','Remark','Payout Charge','GST Charge','Bank Charge','Wallet Deduct','Currency','Create','Update']



  return (
    <section> 
    <h4 style={{fontWeight:"bold",marginBottom:"20px"}}>Local Payouts</h4>
      <Card carddata={cardData}/>
    {/* FILTER SECTION */}
    <div className="row align-items-center mt-3 mb-3">
      <div className="col-6 row">
        <div className="col-4">
          <FilterMerchant setMerchantSelect={setMerchantSelect} />
        </div>
        <div className="col-4">
          <select className="form-select" onChange={(e)=>setStatus(e.target.value)} style={{borderRadius: "20px"}}>
            <option selected>Select By Status</option>
            <option value="FAILURE">FAILED</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="PENDING">PENDING</option>
          </select>
        </div>
        <div className="col-4">
          <select className="form-select" onChange={(e)=>setCurrency(e.target.value)} style={{borderRadius: "20px"}}>
            <option selected>Select By Currency</option>
            {
              currencyName.map((item, index) => {
                return (
                  <option key={index} value={item.sortname}>
                      {item.sortname}
                  </option>
                );
              })
            }
          </select>
        </div>
      </div>
      <div className="col-6 row align-items-center justify-content-end">
        <div className='col-5'> <SearchItem searchItem={searchItem} setSearchItem={setSearchItem}  /> </div>
        <div className="col-4 centerDiv"><FilterDateMax setDate={setDate} setTo={setTo} setFrom={setFrom}/></div>
        <div className="col-3 centerDiv"> <button className={styles.addTransaction} onClick={downloadExl}><ArrowDownwardIcon />Download</button></div>
      </div>
    </div>
     {/* FILTER SECTION END*/}
    <TableComp  tableHeading={tableHeading} tableBodyData={tableBodyData} loading={loading}/>
    <PaginationComp
          setPage={setPage}
          page={page}
          totalPage={totalPage}
          message={message}
        />
    </section>
    
   

     
  )
}

export default LocalPayouts