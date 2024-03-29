import React from "react";
import { Grid } from "@mui/material";
import "./integrations.css";
import deposit from "../../doc/deposite.pdf"
import payout from "../../doc/Technical Integration Document Bankconnect_INR_Payout.pdf";
import sea_cny from "../../doc/Technical Integration Document Bankconnect for SEA & CNY Updated.pdf";
import payoutSEA_CNY from "../../doc/Technical Integration Document Bankconnect for Payout SEA_CNY Updated 1.3.pdf";
function Integrations() {
  return (
    <>
      <h4 className="heading mx-2">Integrations</h4>
      <Grid container  >
        <Grid item xs={12} className="integrationBox mx-3 ">
          <div className="p-3" style={{ width: "85%" }}>
            <p>
              By integrating with one or more third party services, you will be
              responsible for reviewing and understanding the terms and
              conditions associated with each third party service.
            </p>
            <p>
              Is there a third party service or integration you'd like to see?
              Let us know at
              <a href="sales@ubankconnect.com"> sales@ubankconnect.com.</a>
            </p>
            <div className="secondBlock p-3 row">
              <div className="mb-4 col-6">
                <img
                  src="https://www.bankconnect.online/assets/merchants/img/pdfImg.png"
                  alt=" not found"
                  className="pdfImg"
                />
                <br />
                <a href={deposit} download>INR API Deposite</a>
              </div>
              <div className="mb-4 col-6">
                <img
                  src="https://www.bankconnect.online/assets/merchants/img/pdfImg.png"
                  alt=" not found"
                  className="pdfImg"
                />
                <br />
                <a  href={payout} download>INR API Payout</a>
              </div>
              <div className="mb-4 col-6">
                <img
                  src="https://www.bankconnect.online/assets/merchants/img/pdfImg.png"
                  alt=" not found"
                  className="pdfImg"
                />
                <br />
                <a  href={sea_cny} download>SEA & CNY Updated</a>
              </div>
              <div className="col-6">
                <img
                  src="https://www.bankconnect.online/assets/merchants/img/pdfImg.png"
                  alt=" not found"
                  className="pdfImg"
                />
                <br />
                <a  href={payoutSEA_CNY} download>Payout SEA_CNY Updated 1.3</a>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Integrations;
