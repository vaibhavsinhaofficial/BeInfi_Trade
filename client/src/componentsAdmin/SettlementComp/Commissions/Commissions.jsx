import React, { useEffect, useState } from 'react'
import Card from '../../../commonAdminComp/Card/Card'
import FilterDateMax from '../../../commonAdminComp/filterDateMax/FilterDateMax'
import TableComp from './TableComp'
import styles from './style.module.css'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PaginationComp from '../../../commonAdminComp/Pagination/PaginationComp'
import SearchItem from '../../../commonAdminComp/SearchItem/SearchItem'
import AddTransaction from '../BankDeposit/AddTransaction'
import axios from 'axios'
import baseUrl from '../../config/baseUrl'
import * as XLSX from "xlsx";
function Commissions() {
  const [page,setPage]=useState(1)
  const [totalPage,setTotalPage]=useState(1)
  const [tableBodyData,setTableBodyData] = useState([])
  const [date,setDate] = useState('')
  const [to,setTo] = useState('')
  const [from,setFrom] = useState('')
  const [searchItem,setSearchItem] = useState('')
  const [xlsxData,setXlData] = useState([])
  const auth = localStorage.getItem("admin");
    const data =[
        {name: 'Declined', percentage: 2, amount: 400002},
        {name: 'Success', percentage: 24, amount: 222700040},
        {name: 'Refund', percentage: 0, amount: null},
        {name: 'Chargeback', percentage: 0, amount: 1}]

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
      const {data} = await axios.post(`${baseUrl}/api/settelment/commissions`, values, config)
      setTableBodyData(data.result)
      setTotalPage(data.numOfPages)
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
      fetchData()
    },[page,date,to,from,searchItem])


    const tableHeading = ['Date & Day','Merchant Id	','Merchant Name','On Deposit	','On Payout','On Settlement','By Currency','On Disputes & Chargeback','On Refund','Total Commissions','Expenses','Net Commissions','By White Label/Other','Action']
const downloadExl = () => {
  const workSheet = XLSX.utils.json_to_sheet(xlsxData);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "Deposit");
  // Binary String
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  // Download
  XLSX.writeFile(workBook, "BankDeposit.xlsx");
};
  return (
    
    <section> 
    <h4 style={{fontWeight:"bold",marginBottom:"20px"}}>Commissions</h4>
    
    <Card carddata={data}/>
    <br /> <br />
    {/* FILTER SECTION */}
    <div className="row align-items-center justify-content-end">
      <div className="col-9 row align-items-center justify-content-around">
        <div className='col-4'> <SearchItem searchItem={searchItem} setSearchItem={setSearchItem}  /> </div>
        <div className="col-3 centerDiv"><FilterDateMax setDate={setDate} setTo={setTo} setFrom={setFrom}/></div>
        <div className="col-3 centerDiv"> <AddTransaction /></div>
        <div className="col-2 centerDiv"> <button className={styles.addTransaction} onClick={downloadExl}><ArrowDownwardIcon  />Download</button></div>
      </div>
    </div>
     {/* FILTER SECTION END*/}
    <br /><br />
    <TableComp setXlData={setXlData} tableHeading={tableHeading} tableBodyData={tableBodyData}/>
    <PaginationComp
          setPage={setPage}
          page={page}
          totalPage={totalPage}
          message={`Showing 10 from data ${totalPage}`}
        />
    
    </section>
    
  
  )
}


export default Commissions


