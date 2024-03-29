import React, { useEffect, useState } from 'react'
import FilterDateMax from '../../../commonAdminComp/filterDateMax/FilterDateMax'
import TableComp from './TableComp'
import PaginationComp from '../../../commonAdminComp/Pagination/PaginationComp'
import axios from 'axios'
import baseUrl from '../../config/baseUrl'
import AddNewFund from './AddNewFund'
function AddFunds({authCreate, authRead, authUpdate, authDelete}) {
  const [page,setPage]=useState(1)
  const [totalPage,setTotalPage]=useState(1)
  const [tableBodyData,setTableBodyData] = useState([])
  const [date,setDate] = useState('')
  const [to,setTo] = useState('')
  const [from,setFrom] = useState('')
  const [searchItem,setSearchItem] = useState('');
  const [message, setMessage] = useState("");
  const auth = localStorage.getItem("admin");
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
    const {data} = await axios.post(`${baseUrl}/api/settelment/addFundRead`, values, config)
    setTableBodyData(data.result)
    setTotalPage(data.numOfPages)
    setMessage(data.message)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData()
  },[page,date,to,from,searchItem])
      
  const tableHeading = ['Merchant', 'Current Wallet', 'Update Wallet', 'Currency', 'Action', 'Effective Amt', 'Funds added by',' Time & Date', 'Objective', 'Remarks']

  return (
    
    <section> 
    <div className="row align-items-center justify-content-end mb-2">
        <div className="col-4"><h4 className="headingAll">Add Funds</h4></div>
        <div className="col-4"><FilterDateMax setDate={setDate} setTo={setTo} setFrom={setFrom}/></div>
        <div className="col-4">
          {
            authCreate ? (
              <AddNewFund fetchData={fetchData}/>
            ) : null
          }
        </div>
    </div>
     {/* FILTER SECTION END*/}
    <TableComp tableHeading={tableHeading} tableBodyData={tableBodyData} fetchData={fetchData}/>
    <PaginationComp
          setPage={setPage}
          page={page}
          totalPage={totalPage}
          message={message}
        />
    </section>
    
  
  )
}
export default AddFunds