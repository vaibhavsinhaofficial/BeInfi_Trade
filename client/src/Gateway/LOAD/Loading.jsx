import React from 'react';
import "./Loading.css";

const Loading = () => {

  return (
    <div className="page-container">
      <h1 style={{ textAlign: 'center', fontSize: "30px", margin: "50px" }}>Please don't Refresh and Back this page </h1>
       <div className="payment-loader-container">
        <div className="payment-loader">
          <div className="payment-circle">
            <div className="payment-inner-circle"> </div>
            <h5>Payment Processing</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;