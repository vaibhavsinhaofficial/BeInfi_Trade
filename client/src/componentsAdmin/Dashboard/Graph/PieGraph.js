import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ColorRing } from 'react-loader-spinner';

const PieGraph = ({chartData}) => { 
  // const renderLoader = () => (
  //   <div className='' style={{ position: 'relative' }}>    
  //   <ColorRing
  //     visible={true}
  //     height="80"
  //     width="80"
  //     ariaLabel="color-ring-loading"
  //     wrapperStyle={{}}
  //     wrapperClass="color-ring-wrapper"
  //     colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  //   />
  //   </div>
  // );

  return (
    <div className="card p-2 position-relative  border-0 " style={{height:"19rem",borderRadius:"25px"}}>
      <p className="fw-normal ps-2 pt-2  text-decoration-underline name text-uppercase fw-bold" >Successful Transactions</p>
      <div className="d-flex flex-column align-items-center justify-content-center">
      {/* {chartData.loading ? ( // Render loader if loading state is true
            renderLoader()
          ) : ( */}
        <div className='py-0' style={{ position: 'relative' }}>          
            <ReactApexChart options={chartData.options} series={chartData.options.series} type="donut" />       
        </div>
           {/* )} */}
        <div className="fw-normal text-center name pt-1 ">Successful Transaction Amount</div>
        {/* {chartData.loading ? ( 
             <div className="fw-bolder text-center fs-4 amount" style={{ color: "rgb(130,127,129)" }}>₹0</div>
          ) : ( */}
        <p className="fw-bolder text-center fs-4 fs-sm-5 amount" style={{ color: "rgb(130,127,129)" }}>₹{chartData.SuccessValue}</p>
        {/* )} */}
      </div>
    </div>
  );
};
export default PieGraph;
