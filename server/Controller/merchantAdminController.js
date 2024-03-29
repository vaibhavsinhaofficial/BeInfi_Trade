const mysqlcon = require("../config/db_connection");
const crypto = require("crypto");
const nodemailer = require("nodemailer")
const md5 = require('md5')
const path = require('path');
const send_mail = require('../helper/send-mail');
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');

// 👇Read Api 👇
module.exports.merchantAdmin = async (req, res) => {
  // 👇Pagination 👇
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  try {
    let searchItem = req.body.searchItem;
    let sql = "select count (*) as Total from tbl_user";
    let sqlCount =
      "select count (*) as Total FROM tbl_user WHERE wallet  LIKE '%" +
      searchItem +
      "%' OR  payin_upi  LIKE '%" +
      searchItem +
      "%' or  payout_neft  LIKE '%" +
      searchItem +
      "%' or  payout_imps  LIKE '%" +
      searchItem +
      "%' or  payout_rtgs  LIKE '%" +
      searchItem +
      "%' or  rolling_reverse  LIKE '%" +
      searchItem +
      "%' or  id  LIKE '%" +
      searchItem +
      "%' or  name  LIKE '%" +
      searchItem +
      "%' or  secretkey  LIKE '%" +
      searchItem +
      "%' or  sec_iv  LIKE '%" +
      searchItem +
      "%' or  test_secretkey  LIKE '%" +
      searchItem +
      "%' or  test_sec_iv  LIKE '%" +
      searchItem +
      "%'";

    // list api 👇
    let paymentSql = "select * from payment_gateway where type ='0'";
    let paymentResult = await mysqlcon(paymentSql);
    let urlSql = "select * from tbl_ingenico_mid";
    let urlResult = await mysqlcon(urlSql);
    let payoutSql = "select * from payment_gateway where type = '1'";
    let payoutResult = await mysqlcon(payoutSql);

    // list api End 👇

    let result = await mysqlcon(searchItem ? sqlCount : sql);
    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);

    let sql1 = "SELECT tbl_user.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_user ORDER BY created_on DESC LIMIT ?,?";
    let sql2 =
      "SELECT tbl_user.*, DATE_FORMAT(created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_user  WHERE wallet  LIKE '%" +
      searchItem +
      "%' OR  payin_upi  LIKE '%" +
      searchItem +
      "%' or  payout_neft  LIKE '%" +
      searchItem +
      "%' or  payout_imps  LIKE '%" +
      searchItem +
      "%' or  payout_rtgs  LIKE '%" +
      searchItem +
      "%' or  rolling_reverse  LIKE '%" +
      searchItem +
      "%' or  id  LIKE '%" +
      searchItem +
      "%' or  name  LIKE '%" +
      searchItem +
      "%' or  secretkey  LIKE '%" +
      searchItem +
      "%' or  sec_iv  LIKE '%" +
      searchItem +
      "%' or  test_secretkey  LIKE '%" +
      searchItem +
      "%' or  test_sec_iv  LIKE '%" +
      searchItem +
      "%' LIMIT ?,?";

    let result1 = await mysqlcon(searchItem ? sql2 : sql1, [start, limit]);

    let startRange = start + 1;
    let endRange = start + result1.length;

    return res.json(200, {
      message: result1.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
      currentPage: page,
      totalPages: numOfPages,
      pageLimit: limit,
      data: result1,
      paymentResult,
      urlResult,
      payoutResult,
    });
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// Update select and key Gen 👇
module.exports.updateSelectKey = async (req, res) => {
  try {
    let { id, secretName, value } = req.body;

    if (!id && !secretName) {
      return res.json(205, {
        message: "Kindly Provide Id and Name🆔",
      });
    }
    if (
      secretName === "secretkey" ||
      secretName === "sec_iv" ||
      secretName === "test_secretkey" ||
      secretName === "test_sec_iv"
    ) {
      value = crypto.randomBytes(8).toString("hex");
    }

    let sql = "UPDATE tbl_user SET " + secretName + " = ? WHERE id = ?";

    let result = await mysqlcon(sql, [value, id]);
    if (result) {
      return res.json(200, {
        message: "Update Successfully✅",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// 👇 Update Api 👇
module.exports.updateMerchantAdmin = async function (req, res) {
  try {
    let { id } = req.body;
    let details = {
      mid: req.body.value.MID,
      merchant_url: req.body.value.MerchantURL,
      fname: req.body.value.Firstname,
      lname: req.body.value.Lastname,
      name: `${req.body.value.Firstname} ${req.body.value.Lastname}`,
      email: req.body.value.Email,
      mobile_no: req.body.value.Mobileno,
      bname: req.body.value.Businessname,
      blocation: req.body.value.Businesslocation,
      job_title: req.body.value.Jobtitle,
      website: req.body.value.Website,
      apv: req.body.value.AnnualProcessingVolume,
      ata: req.body.value.AverageTransactionAmount,
      charge_back_per: req.body.value.Chargebackpercentage,
      currencies_req: req.body.value.Currenciesrequired,
      settle_currency: req.body.value.SettledCurrency,
      mid2: req.body.value.MIDBilldesk,
      mkey2: req.body.value.MKEYBilldesk,
      mkey3: req.body.value.IsPayEncryptionKey,
      secure_secret: req.body.value.IsPaySecureSecret,
      access_code: req.body.value.IsPayAccessCode,
      mcc_code: req.body.value.IsPayMerchantCode,
      terminal_id: req.body.value.IsPayTerminalID,
      chargebk_down: req.body.value.ChargeBackChargesDown,
      chargebk_up: req.body.value.ChargeBackChargesUp,
      mid3: req.body.value.IsPayMerchantCode,
      cashfree_mid: req.body.value.CashfreeMid,
      cashfree_scerity_key: req.body.value.CashfreeSecretkey,
      mkey: req.body.value.MKEY,
      rolling_reverse: req.body.value.RollingReverseCharges,
      rolling_reverse_months: req.body.value.RollingReversemonth,
      refund: req.body.value.RefundChargesINR,
      updated_on:formattedIST
    };

    // let detail = {
    //   payin_upi: req.body.value1.payinUPI,
    //   payin_card: req.body.value1.PayinCard,
    //   payin_netbanking: req.body.value1.PayinNetbanking,
    //   payin_wallet: req.body.value1.PayinWallet,
    //   payin_qr: req.body.value1.PayinQR,
    //   vaoffline: req.body.value1.vaoffline,
    //   payout_amount: req.body.value1.PayoutAmount,
    //   gst_amount: req.body.value1.GstAmount,
    //   currency_id: req.body.value1.currency_id,
    //   currency_code: req.body.value1.sortname
    // };
    if (id) {
      let sql = "UPDATE tbl_user SET ? where id = ?";
      // let sqlmerchantCharges = "UPDATE tbl_merchant_charges SET ? WHERE currency_id = ?"
      let result = await mysqlcon(sql, [details, id]);
      // let resultMerchantCharges = await mysqlcon(sqlmerchantCharges, [detail, req.body.value1.currency_id])
      // if (result && resultMerchantCharges) {
      if (result) {
        return res.json(200, {
          message: "Merchant Details Updated",
        });
      } else {
        return res.json(201, {
          message: "Error while updating",
        });
      }
    } else {
      return res.json(205, {
        message: "Kindly Provide Id",
      });
    }
  } catch (error) {
    console.log(error)
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// ADD Bank
module.exports.addBanks = async function(req, res) {
  try {
    let {selectedOption, id} = req.body
    const values = selectedOption.map(item => item.value);
    const commaSeparatedValues = values.join(', ');
    let sql = "UPDATE tbl_user SET bankid = ? where id = ?";
    let result = await mysqlcon(sql, [commaSeparatedValues, id])
    if(result){
      return res.json(200, {
        message: "Merchant Details Updated",
      });
    }
  } catch (error) {
    console.log(error)
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
}

// Read one  Api 👇
module.exports.readOneMerchantAdmin = async function (req, res) {

  try {
    let { id } = req.body;
    if (!id) {
      return res.json(205, {
        message: "Kindly Provide Id",
      });
    }
    let sql = "SELECT * FROM tbl_user WHERE id = ?";
    let result = await mysqlcon(sql, [id]);

    let sql2 = "SELECT c.name, c.id,c.sortname FROM countries c INNER JOIN tbl_user u ON FIND_IN_SET(c.id,u.solution_apply_for_country) WHERE u.id=?";
    let country = await mysqlcon(sql2, [id]);
    // return res.send(country)

    let sql4 = "SELECT currency_id,payin_upi,payin_card,payin_netbanking,payin_wallet,payin_qr,vaoffline,payout_amount,gst_amount FROM tbl_merchant_charges"

    let rem_res = await mysqlcon(sql4);


    var countryResult = country.map((item) => {
      return {
        currency_id: rem_res.filter((data) => item.id == data.currency_id).reduce((initial, value) => { return value.currency_id }, item.id),
        sortname: item.sortname,
        name: item.name,
        payinUPI: rem_res.filter((data) => data.currency_id == item.id).reduce((initial, value) => { return value.payin_upi }, 0),
        PayinCard: rem_res.filter((data) => data.currency_id == item.id).reduce((initial, value) => { return value.payin_card }, 0),
        PayinNetbanking: rem_res.filter((data) => data.currency_id == item.id).reduce((initial, value) => { return value.payin_netbanking }, 0),
        PayinWallet: rem_res.filter((data) => data.currency_id == item.id).reduce((initial, value) => { return value.payin_wallet }, 0),
        PayinQR: rem_res.filter((data) => data.currency_id == item.id).reduce((initial, value) => { return value.payin_qr }, 0),
        vaoffline: rem_res.filter((data) => data.currency_id == item.id).reduce((initial, value) => { return value.vaoffline }, 0),
        PayoutAmount: rem_res.filter((data) => data.currency_id == item.id).reduce((initial, value) => { return value.payout_amount }, 0),
        GstAmount: rem_res.filter((data) => data.currency_id == item.id).reduce((initial, value) => { return value.gst_amount }, 0),
      }

    })

    let sql3 = "SELECT code as value , title as label FROM tbl_akonto_banks_code";
    let bankName = await mysqlcon(sql3);

    let selectedBank = "SELECT bankid FROM tbl_user WHERE id = ?";
    let bankTitleQuery = "SELECT title FROM tbl_akonto_banks_code WHERE code = ?";
    let selectResult = await mysqlcon(selectedBank, [id]);

    let bankTitles = [];

    if(selectResult.length>0){
      // Split the comma-separated list of bank IDs into an array
      let bankIds = selectResult[0].bankid.split(',').map(id => id.trim());

      for (const bankId of bankIds) {
        let titleResult = await mysqlcon(bankTitleQuery, [bankId]);
        if (titleResult.length > 0) {
          bankTitles.push(titleResult[0].title);
        }
      }
    }

    if (result) {
      return res.json(200, {
        message: "Data Found",
        data: result[0],
        country: countryResult,
        bankName: bankName,
        bankTitles
      });
    } else {
      return res.json(201, {
        message: "Data Not Found",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
}

// 👇Delete Api 👇
module.exports.deleteMerchantAdmin = async function (req, res) {
  try {
    let { id } = req.body;

    let sql = "DELETE FROM tbl_user WHERE id = ?";
    let result = await mysqlcon(sql, [id]);

    if (result) {
      return res.json(200, {
        message: "Delete Successfully✅",
      });
    } else {
      return res.json(201, {
        message: "Error while Deleting",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// 👇 Create Api👇
module.exports.createMerchantAdmin = async function (req, res) {
  try {
    let {
      fname,
      lname,
      email,
      mobile_no,
      bname,
      blocation,
      job_title,
      website,
      apv,
      ata,
      charge_back_per,
      currencies_req,
    } = req.body;
    
    let currenciesString = currencies_req.join(',');
    
    let countryIds = [];

    for (let currency of currencies_req) {
      let countrySql = "SELECT id FROM countries WHERE sortname = ?";
      let [country] = await mysqlcon(countrySql, [currency]);
      if (country && country.id) {
        countryIds.push(country.id);
      }
    }
    
    let countryIdsString = countryIds.join(',');

    const defaultPassword = Math.random().toString(36).slice();
    const Password = md5(defaultPassword)

    let details = {
      name: fname + " " + lname,
      fname,
      lname,
      email,
      mobile_no,
      bname,
      blocation,
      job_title,
      website,
      apv,
      ata,
      charge_back_per,
      solution_apply_for_country: countryIdsString,
      currencies_req: currenciesString,
      account_type: 1,
      password: Password,
      created_on : formattedIST,
      updated_on : formattedIST
    };
   

    let sql = "INSERT INTO tbl_user SET ?";
    let result = await mysqlcon(sql, [details]);

    if (result) {
      var page_path = path.join(__dirname, '../views/submerchant.ejs');
      let name = `${req.body.FirstName} ${req.body.LastName}`;
      send_mail.mail({email: req.body.Email,mobile_no: req.body.MobileNo,name : name, usercode: "Merchant",Password : defaultPassword,subject:"Merchant Created"}, 'Mercahnt');
      return res.json(200, {
        message: "Merchant Added Successfully✅",
      });
    } else {
      return res.json(201, {
        message: "Error While Creating",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// Update Wallet 👇
module.exports.updateWallet = async function (req, res) {
  try {
    let { id, wallet } = req.body;
    if (!id && !wallet) {
      return res.json(205, {
        message: "Kindly Provide Id and Wallet",
      });
    }
    let sql = "UPDATE tbl_user SET wallet = ? where id = ?";
    let result = await mysqlcon(sql, [wallet, id]);
    if (result) {
      return res.json(200, {
        message: "Merchant Wallet Updated Successfully✅",
      });
    } else {
      return res.json(201, {
        message: "Data Not updated",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// Update Sandbox Wallet 👇
module.exports.updateSandboxWallet = async function (req, res) {
  try {
    let { id, wallet } = req.body;
    if (!id && !wallet) {
      return res.json(205, {
        message: "Kindly Provide Id and Wallet",
      });
    }
    let sql = "UPDATE tbl_user SET sandboxwallet = ? where id = ?";
    let result = await mysqlcon(sql, [wallet, id]);
    if (result) {
      return res.json(200, {
        message: "Merchant Sandbox Wallet Updated Successfully✅",
      });
    } else {
      return res.json(201, {
        message: "Data Not updated",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// Verify & Complete
module.exports.verifyProfile = async function (req, res) {
  try {
    let {id} = req.body;
    
    let sql = "UPDATE tbl_user SET email_verification = 1 WHERE id = ?";
    let result = await mysqlcon(sql, [ id]);
    
    if (result) {
      return res.json(200, {
        message : `Email Verified Successfully`
      });
    }else {
      return res.json(201, {
        message: "Error while Changing email",
      });
    }
  } catch (error) {
    console.log(error)
    return res.json(500, {
      message: "error occurred",
      error: error,
    });
  }
};

module.exports.completeProfile = async function (req, res) {
  try {
    let {id} = req.body;
  
    let sql = "UPDATE tbl_user SET complete_profile = 1 WHERE id = ?";
    let result = await mysqlcon(sql, [id]);

    if (result) {
      return res.json(200, {
        message: `Profile Completed Successfully`
      });
    } else {
      return res.json(201, {
        message: "Error while Changing Profile",
      });
    }
  } catch (error) {
    console.log(error)
    return res.json(500, {
      message: "error occurred",
      error: error,
    });
  }
}

module.exports.sendMail = async(req,res)=>{

  const {email} = req.body;
  
  try{
  const defaultPassword = Math.random().toString(36).slice();

  const sql = `UPDATE tbl_user SET password ='${md5(defaultPassword)}' WHERE email='${email}'`
  let result = await mysqlcon(sql,[email])
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "kr.manjeet319@gmail.com",
      pass: "mfvadlyccsgukabu",
    }
  });
  
  const mailOptions = {
    from: "kr.manjeet319@gmail.com",
    to: email,
    subject: 'Your new password',
    text: 'Your new password is ' + defaultPassword
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error){
      res.status(200).json({
        message : "error",
      })
    } else {
      res.status(200).json({
        message : "The reset password link has been sent to your email address",
      });
    }
  });

  }catch(error){
    console.log(error)
    return res.json(500,{
      message  : "error occurred"
    })
  }
}

// assign payin gateway

module.exports.payinGateway = async (req, res)=> {
  try {
    let paymentSql = "select gateway_number, gateway_name from payment_gateway where type ='0'";
    let paymentResult = await mysqlcon(paymentSql);
    return res.json(200, {
      paymentResult
    });
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
}

module.exports.payoutGateway = async (req, res)=> {
  try {
    let payoutSql = "select id, gateway_name from payment_gateway where type = '1'";
    let payoutResult = await mysqlcon(payoutSql);
    return res.json(200, {
      payoutResult
    });
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
}

module.exports.assignPayinGateway = async(req,res) =>{
  try{
    let {merNo,gatewayNo,currency,type} = req.body;
    console.log(req.body);
    let sqlS = "SELECT * FROM gateway_detail WHERE merNo = ? AND currency = ? AND type = ?"
    let resultS = await mysqlcon(sqlS,[merNo,currency,type])

    let merName = "SELECT name FROM tbl_user WHERE id = ?"
    let nameResult = await mysqlcon(merName, [merNo])

    if (resultS.length>0){
      let details = {
        gatewayNo,
        currency,
        type
      };
      let sqlU = "UPDATE gateway_detail SET ? WHERE merNo = ?";
      let resultU = await mysqlcon(sqlU, [details, merNo]);
      if (resultU) {
        return res.json(200, {
          message: `Deposit Gateway Updated For Merchant Name ${nameResult[0].name}`,
        });
      } else {
        return res.json(201, {
          message: "Error while updating",
        });
      }
    } else{
      let detail = {
        merNo  ,
        gatewayNo,
        currency,
        type
      };
      let sqlC = "INSERT INTO gateway_detail  SET ?";
      let resultC = await mysqlcon(sqlC, [detail]);
      if (resultC) {
        return res.json(200, {
          message: `Deposit Gateway Updated For Merchant Name ${nameResult[0].name}`,
        });
      } else {
        return res.json(201, {
          message: "Error while creating",
        });
      }
    }
  }catch(error){
    console.log(error)
    return res.json(500,{
      message : "error occurred"
    })
  }
}

// assign payout gateway
module.exports.assignPayoutGateway = async(req,res)=>{
  try{
    let {merNo,gatewayNo,currency} = req.body;
    console.log(req.body)
    let sqlS = "SELECT * FROM payout_gateway_detail WHERE merNo = ? AND currency = ?"
    let resultS = await mysqlcon(sqlS,[merNo, currency])

    let merName = "SELECT name FROM tbl_user WHERE id = ?"
    let nameResult = await mysqlcon(merName, [merNo])
    if (resultS.length>0){
      let details = {
        gatewayNo,
        currency,
        type: 1
      };
      let sqlU = "UPDATE payout_gateway_detail SET ? WHERE merNo = ?";
      let resultU = await mysqlcon(sqlU, [details, merNo]);
      if (resultU) {
        return res.json(200, {
          message: `Payout Gateway Updated For Merchant Name ${nameResult[0].name}`,
        });
      } else {
        return res.json(201, {
          message: "Error while updating",
        });
      }
    } else{
      let detail = {
        merNo  ,
        gatewayNo,
        currency,
        type: 1
      };
      let sqlC = "INSERT INTO payout_gateway_detail  SET ?";
      let resultC = await mysqlcon(sqlC, [detail]);
      if (resultC) {
        return res.json(200, {
          message: `Payout Gateway Updated For Merchant Name ${nameResult[0].name}`,
        });
      } else {
        return res.json(201, {
          message: "Error while creating",
        });
      }
    }
  }catch(error){
    console.log(error)
    return res.json(500,{
      message : 'error'
    })
  }
}

// module.exports.payoutdefault = async(req, res) =>{
//   try {
//     let {id, currency} = req.body
//     let sql = "SELECT gatewayNo FROM `payout_gateway_detail` WHERE merNo = ? AND currency = ? AND type = 1";
//     let result = await mysqlcon(sql, [id, currency])
//     return res.json(200, {
//       result
//     });
//   } catch (error) {
//     return res.json(500, {
//       message: "error occurered",
//       error: error,
//     });
//   }
// }

// upi & cards switching

// select upi & cards api
module.exports.default_inr = async(req,res)=>{
  try{
    let {id} = req.body
    let sql = "SELECT payment_gateway.gateway_name, tc.akontocode, tc.payment_gate, tc.bank_services_charge, tc.title, tc.code, tc.payment_gate FROM tbl_code tc INNER JOIN tbl_akonto_banks_code abc ON abc.code = tc.akontocode INNER JOIN payment_gateway ON tc.payment_gate = payment_gateway.id WHERE abc.currencies = 'INR' GROUP BY tc.payment_gate"
    let result = await mysqlcon(sql);
    let sql1 = "SELECT * FROM tbl_gateway_switching WHERE merchantno = ?"
    let result1 = await mysqlcon(sql1, [id])
    const groupedBanks = {};
    result.forEach(bank => {
    const { gateway_name,title,bank_services_charge,payment_gate } = bank;
      groupedBanks[title] = {
        payment_gate,
        waynames: [ gateway_name  + "_" + bank_services_charge ],
      };
    });
    const filteredBanks = Object.values(groupedBanks);
    // return res.send(groupedBanks)
    return res.json(201, {
      filteredBanks,
      result1
    });
  }catch(error){
      console.log(error)
      return res.json({
        message : 'error'
      })
  }
}

module.exports.defautlSwitchingData = async(req, res) => {
  try {
    let {merchantno, type, category} = req.body;
    console.log(req.body);
    let sql = `SELECT * FROM tbl_gateway_switching WHERE merchantno = ${merchantno} AND currency = 'INR' AND type = ${type} AND category_id = ${category}`;
    let result = await mysqlcon(sql)
    return res.send(result)
  } catch (error) {
    console.log(error)
    return res.json({
      message : 'error'
    })
  }
}

// insert & update
module.exports.update_inrInsert_inr = async(req, res) => {
  try {
    console.log(req.body);
    let {id, type, category, gateways_0, gateways_1, gateways_2, gateways_3, charges_0, charges_1, charges_2, charges_3,bank_code} = req.body;
    currentDate = new Date();
    let details = {
      type: type,
      category_id: category,
      gateway_1: gateways_0 ,
      gateway_2: gateways_1,
      gateway_3: gateways_2,
      gateway_4: gateways_3,
      charges_1: charges_0,
      charges_2: charges_1,
      charges_3: charges_2,
      charges_4: charges_3,
      bank_code: bank_code || null, 
      // Set bank_code to provided value or null if not provided ->
      // value = card = [1- CREDIT CARD, 2- DEBIT CARD 3- RUPAY, 4- AMERICAN EXPRESS]
      //  Ewallet = [1- paytm, 2- phonePay, 3- GooglePay, 4- Amazon Pay, 5- freecharge, 6- Mobikwik, 7- Other]
      //  netBanking = [1- Axis Bank, 2- ICICI Bank, 3- Kotak, 4- HDFC Bank, 5- State Bank Of India, 6- Yes Bank, 7- Other]
      updated_on : currentDate,
      currency :'INR',
    };
    let detail = {
      merchantno: id,
      type: type,
      category_id: category,
      gateway_1: gateways_0 ,
      gateway_2: gateways_1,
      gateway_3: gateways_2,
      gateway_4: gateways_3,
      charges_1: charges_0,
      charges_2: charges_1,
      charges_3: charges_2,
      charges_4: charges_3,
      bank_code: bank_code || null, // Set bank_code to provided value or null if not provided
      created_on : currentDate,
      updated_on : currentDate,
      currency :'INR',
    };

    // let insertDetails;
    // let insertSql;
    // let insertResult;

    let sqlCheckMerchant = "SELECT merchantno FROM tbl_gateway_switching WHERE merchantno = ?";
    let resultCheckMerchant = await mysqlcon(sqlCheckMerchant, [id]);
    console.log("hello", resultCheckMerchant.length);
    // return
    if (resultCheckMerchant.length > 0) {
      // Update existing record
      let sqlUpdate = "UPDATE tbl_gateway_switching SET ? WHERE merchantno = ?";
      let resultUpdate = await mysqlcon(sqlUpdate, [details, id]);
      // insertDetails ={
      //   user_id : merchantno,
      //   title : "GateWay Updated",
      //   message: `Gateway Updated For INR Currency`,
      //   created_on: currentDate,
      //   updated_on: currentDate,
      //   type: 1
      // }
      // insertSql = "INSERT INTO tbl_notification SET ?"
      // insertResult = await mysqlcon(insertSql, [insertDetails])
      if (resultUpdate) {
        return res.json(200, {
          message: 'Data updated',
          // insertResult
        });
      } else {
        return res.json(201, {
          message: 'Error updating data'
        });
      }
    } else {
      // Insert new record
      let sqlInsert = "INSERT INTO tbl_gateway_switching SET ?";
      let resultInsert = await mysqlcon(sqlInsert, [detail]);

      // insertDetails ={
      //   user_id : merchantno,
      //   title : "GateWay Updated",
      //   message: `Gateway Inserted For INR Currency`,
      //   created_on: currentDate,
      //   updated_on: currentDate,
      //   type: 1
      // }
      // insertSql = "INSERT INTO tbl_notification SET ?"
      // insertResult = await mysqlcon(insertSql, [insertDetails])

        if (resultInsert) {
          return res.json(200, {
            message: 'Data added',
            // insertResult
          });
        } else {
          return res.json(201, {
            message: 'Error inserting data'
          });
        }
    }
  }
  catch(error){
    console.log(error);
    return res.json({
      message: 'error'
    })
  }
}

// module.exports.update_inrInsert_inr = async (req, res) => {
//   try {
//     const {
//       merchantno,
//       type,
//       category_id,
//       gateway_1,
//       gateway_2,
//       gateway_3,
//       gateway_4,
//       gateway_5,
//       charges_1,
//       charges_2,
//       charges_3,
//       charges_4,
//       charges_5,
//       bank_code,
//     } = req.body;

//     const currentDate = new Date();
//     const details = {
//       type,
//       category_id,
//       gateway_1,
//       gateway_2,
//       gateway_3,
//       gateway_4,
//       gateway_5,
//       charges_1,
//       charges_2,
//       charges_3,
//       charges_4,
//       charges_5,
//       bank_code: bank_code || null,
//       updated_on: currentDate,
//       currency: 'INR',
//     };

//     const detail = {
//       merchantno,
//       type,
//       category_id,
//       gateway_1,
//       gateway_2,
//       gateway_3,
//       gateway_4,
//       gateway_5,
//       charges_1,
//       charges_2,
//       charges_3,
//       charges_4,
//       charges_5,
//       bank_code: bank_code || null,
//       created_on: currentDate,
//       updated_on: currentDate,
//       currency: 'INR',
//     };

//     const isMerchantExists = await checkIfMerchantExists(merchantno);

//     const insertDetails = {
//       user_id: merchantno,
//       title: "GateWay Updated",
//       message: `Gateway ${isMerchantExists ? 'Updated' : 'Inserted'} For INR Currency`,
//       created_on: currentDate,
//       updated_on: currentDate,
//       type: 1,
//     };

//     // const insertSql = "INSERT INTO tbl_notification SET ?";
//     // const insertResult = await mysqlcon(insertSql, [insertDetails]);

//     if (isMerchantExists) {
//       await updateMerchantRecord(details, merchantno);
//       return res.json(200, {
//         message: 'Data updated',
//         // insertResult,
//       });
//     } else {
//       await insertNewMerchantRecord(detail);
//       return res.json(200, {
//         message: 'Data added',
//         // insertResult,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       message: 'error',
//     });
//   }
// };

// async function checkIfMerchantExists(merchantno) {
//   const sqlCheckMerchant = "SELECT merchantno FROM tbl_gateway_switching WHERE merchantno = ?";
//   const resultCheckMerchant = await mysqlcon(sqlCheckMerchant, [merchantno]);
//   return resultCheckMerchant.length > 0;
// }

// async function updateMerchantRecord(details, merchantno) {
//   const sqlUpdate = "UPDATE tbl_gateway_switching SET ? WHERE merchantno = ?";
//   return await mysqlcon(sqlUpdate, [details, merchantno]);
// }

// async function insertNewMerchantRecord(detail) {
//   const sqlInsert = "INSERT INTO tbl_gateway_switching SET ?";
//   return await mysqlcon(sqlInsert, [detail]);
// }


// e-wallet & netbanking switching 
module.exports.default_inr_netbankingEwallet = async function (req, res){
  try {
    let {type} = req.body;
    let sqlEwallet = `SELECT sb.id,sb.name AS title,sba.bankcode,tc.payment_gate,tc.bank_services_charge,pg.gateway_name FROM switching_banks sb INNER JOIN switching_bank_akontocode sba ON sb.id= sba.bank_id INNER JOIN tbl_code tc ON sba.bankcode=tc.akontocode INNER JOIN payment_gateway pg ON tc.payment_gate = pg.id WHERE sb.status = 1 AND sb.type = ${type}`
    let result = await mysqlcon(sqlEwallet, [type]);
    const mobikwik = [];
    const otherWallet = [];
    const paytm = [];
    const amazonPay = [];
    const phonePay = [];
    const freecharge = [];
    const googlePay = [];
    const axis = [];
    const otherNetBanking = [];
    const icici = [];
    const kotak = [];
    const hdfc = [];
    const sbi = [];
    const yes = [];
    result.forEach((bank) => {
      const { gateway_name, title, bank_services_charge, payment_gate } = bank;
      const bankData = {
        payment_gate,
        waynames: gateway_name + "_" + bank_services_charge,
      };
    
      if (title === "Mobikwik") {
        mobikwik.push(bankData);
      } else if (title === "Other Wallet") {
        otherWallet.push(bankData);
      } else if (title === "Paytm") {
        paytm.push(bankData);
      } else if (title === "Amazon Pay") {
        amazonPay.push(bankData);
      } else if (title === "Phone Pay") {
        phonePay.push(bankData);
      } else if (title === "Freecharge") {
        freecharge.push(bankData);
      } else if (title === "Google Pay") {
        googlePay.push(bankData);
      } else if (title === "Other Netbanking") {
        otherNetBanking.push(bankData);
      } else if (title === "Axis") {
        axis.push(bankData);
      } else if (title === "ICICI") {
        icici.push(bankData);
      } else if (title === "Kotak") {
        kotak.push(bankData);
      } else if (title === "HDFC") {
        hdfc.push(bankData);
      } else if (title === "SBI") {
        sbi.push(bankData);
      } else if (title === "YES") {
        yes.push(bankData);
      }
    });
    return res.json(201, {
      mobikwik,
      otherWallet,
      paytm,
      amazonPay,
      phonePay,
      freecharge,
      googlePay,
      axis,
      hdfc,
      icici,
      kotak,
      sbi,
      yes,
      otherNetBanking
    });
  }catch(error){
    return res.json(500, {
      message: "error occurered",
      error:error
    });
  }
}

module.exports.default_bankUbankconnect = async(req, res) => {
  try {
    let walletSql = `SELECT abc.title, abc.code FROM tbl_akonto_banks_code abc INNER JOIN tbl_user user ON FIND_IN_SET(abc.code, user.bankid) INNER JOIN tbl_code ON abc.code = tbl_code.akontocode INNER JOIN payment_gateway ON tbl_code.payment_gate = payment_gateway.id WHERE LOWER(abc.currencies) = 'INR' AND abc.type = 1 AND abc.status = 1 GROUP BY abc.code `;

    let walletResult = await mysqlcon(walletSql);

    let netBankingSql = `SELECT abc.title, abc.code FROM tbl_akonto_banks_code abc INNER JOIN tbl_user user ON FIND_IN_SET(abc.code, user.bankid) INNER JOIN tbl_code ON abc.code = tbl_code.akontocode INNER JOIN payment_gateway ON tbl_code.payment_gate = payment_gateway.id WHERE LOWER(abc.currencies) = 'INR' AND abc.type = 0 AND abc.status = 1 GROUP BY abc.code `;

    let netBankingResult = await mysqlcon(netBankingSql);
    
    return res.json(200, {
      walletResult,
      netBankingResult
    });
  }catch(error)
  {
    console.log(error);
    return res.json({
      message: 'error'
    })
  }
}

module.exports.updateInsert_bankUbank_inr = async(req, res) => {
  try {
    let { payment_type, bank_id, bankcode} = req.body;
    let sqlbankid = "SELECT id FROM switching_banks WHERE status = 1 and id = ?";
    let result =  await mysqlcon(sqlbankid, [bank_id]);
    currentDate = new Date();
    let details = {
      payment_type,
      bank_id : result[0].id,
      bankcode,
      modification_date : currentDate,
    };
    let detail = {
      payment_type,
      bank_id : result[0].id,
      bankcode,
      creation_date: currentDate,
      modification_date : currentDate,
    }
    let sqlCheckMerchant = "SELECT id FROM switching_bank_akontocode WHERE id = ?";
    let resultCheckMerchant = await mysqlcon(sqlCheckMerchant, [bank_id]);
    if (resultCheckMerchant.length > 0) {
      // Update existing record
      let sqlUpdate = "UPDATE switching_bank_akontocode SET ? WHERE id = ?";
      let resultUpdate = await mysqlcon(sqlUpdate, [details, bank_id]);
      if (resultUpdate) {
        return res.json(200, {
          message: 'Data updated'
        });
      } else {
        return res.json(201, {
          message: 'Error updating data'
        });
      }
    } else {
      // Insert new record
      let sqlInsert = "INSERT INTO switching_bank_akontocode SET ?";
      let resultInsert = await mysqlcon(sqlInsert, [detail]);
      if (resultInsert) {
        return res.json(200, {
          message: 'Data added'
        });
      } else {
        return res.json(201, {
          message: 'Error inserting data'
        });
      }
    }
  }
  catch(error){
    console.log(error);
    return res.json({
      message: 'error'
    })
  }
};

// NON INR select
module.exports.NonINR = async (req, res) => {
  const { merchantno, currencies } = req.body;
  const sql = `SELECT tbl_akonto_banks_code.code AS Code, tbl_akonto_banks_code.title AS bankname, tbl_akonto_banks_code.type AS type, payment_gateway.gateway_name AS wayname, payment_gateway.gateway_number AS waynumber, tbl_code.bank_services_charge AS bankcharge FROM tbl_akonto_banks_code INNER JOIN tbl_user ON FIND_IN_SET(tbl_akonto_banks_code.code, tbl_user.bankid) INNER JOIN tbl_code ON tbl_akonto_banks_code.code = tbl_code.akontocode INNER JOIN payment_gateway ON tbl_code.payment_gate = payment_gateway.id WHERE tbl_akonto_banks_code.currencies = ? AND tbl_user.id = ?`;
  try {
    const result = await mysqlcon(sql, [currencies, merchantno]);
    const bankDataByType = {
      netbanking: [],
      wallet: [],
      debitcard: [],
      creditcard: [],
      qrcode: [],
      apm: [],
    };
    const groupBank = {};

    for (const bank of result) {
      const { bankname, Code, bankcharge, wayname, waynumber, type } = bank;

      groupBank[bankname] = groupBank[bankname] || {
        Code,
        type,
        bankname,
        waynumbers: [],
        waynames: [],
        typeName: getTypeArrayName(type),
      };

      groupBank[bankname].waynames.push(`${wayname}-${bankcharge}`);
      groupBank[bankname].waynumbers.push(`${Code}_${waynumber}`);
    }

    for (const bank of Object.values(groupBank)) {
      const { typeName } = bank;
      bankDataByType[typeName].push(bank);
    }

    return res.json(200, {
      data: bankDataByType,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

function getTypeArrayName(type) {
  switch (type) {
    case 0:
      return 'netbanking';
    case 1:
      return 'wallet';
    case 5:
      return 'qrcode';
    case 6:
      return 'apm';
    default:
      return '';
  }
}

module.exports.NonINRUpdate = async(req,res)=>{
  try{
    const {merchantno,currency} = req.body
    let sql = "SELECT merchantno FROM tbl_gateway_switching WHERE merchantno = ?"
    let result = await mysqlcon(sql,[merchantno]);
  
    let {waynumber1,waynumber2,waynumber3,charge1,charge2,charge3} = req.body;
  
    const parts = waynumber1.split('_');
    const parts1 = waynumber2.split('_');
    const parts2 = waynumber3.split('_');
    
    const typeText = parts[0];
    const akontoCode = parts[1];
    let type;
  
    if(typeText === "netbanking"){
      type = 3;
    } else if(typeText === "wallet"){
      type = 4;
    } else if(typeText === "qrcode"){
      type = 5;
    } else if(typeText === "creditcard" || typeText === "debitcard"){
      type = 1
    }
  
    const gateway1 = parts[2];
    const gateway2 = parts1[2];
    const gateway3 = parts2[2];
  
    let underscoreIndex = waynumber1.indexOf("_");
  
    let date = new Date();
    let details = {
      currency : currency,
      type: type,
      gateway_1 : gateway1,
      gateway_2 : gateway2,
      gateway_3 : gateway3,
      akonto_code: akontoCode,
      charges_1 : charge1,
      charges_2 : charge2,
      charges_3 : charge3,
      updated_on : date
    };
  
    let detail = {
      merchantno : merchantno,
      currency : currency,
      type: type,
      gateway_1 : gateway1,
      gateway_2 : gateway2,
      gateway_3 : gateway3,
      akonto_code: akontoCode,
      charges_1 : charge1,
      charges_2 : charge2,
      charges_3 : charge3,
      created_on : date,
      updated_on : date
    };
      
    if (result.length > 0) {
    let sqlU = "UPDATE tbl_gateway_switching SET ? WHERE merchantno = ?"
    let resultU = await mysqlcon(sqlU,[details,[merchantno]])
    if(resultU){
      return res.json(200,{
        message : 'Data Updated'
      })
    }else{
      return res.json(200,{
        message : 'Error when Update'
      })
    }
    } else{
      let sqlC = "INSERT INTO tbl_gateway_switching SET ?"
      let resultC = await mysqlcon(sqlC,[detail])
      if(resultC){
        return res.json(200,{
          message : 'Data Created'
        })
      }else{
        return res.json(200,{
          message : 'Error when Create'
        })
      }
    }
  } catch(error){
    console.log(error)
    return res.json(500,{
      message : 'error'
    })
  }
}

module.exports.updateMerchantCharges = async function(req, res) {
  try {
    let { id } = req.body;
    
    let sqlCheckCurrency = "SELECT currency_id FROM tbl_merchant_charges WHERE currency_id = ?"
    let resultCheckCurrency = await mysqlcon(sqlCheckCurrency, [req.body.value1.currency_id]);

    if (resultCheckCurrency.length > 0){
      let detail = {
        payin_upi: req.body.value1.payinUPI,
        payin_card: req.body.value1.PayinCard,
        payin_netbanking: req.body.value1.PayinNetbanking,
        payin_wallet: req.body.value1.PayinWallet,
        payin_qr: req.body.value1.PayinQR,
        vaoffline: req.body.value1.vaoffline,
        payout_amount: req.body.value1.PayoutAmount,
        gst_amount: req.body.value1.GstAmount,
        currency_id: req.body.value1.currency_id,
        currency_code: req.body.value1.sortname
      };
      let sqlmerchantCharges = "UPDATE tbl_merchant_charges SET ? WHERE user_id = ? AND currency_id = ?"
      let resultMerchantCharges = await mysqlcon(sqlmerchantCharges, [detail, id, req.body.value1.currency_id])
      if (resultMerchantCharges) {
        return res.json(200, {
          message: "Payment Method Charges Updated",
        });
      } else {
        return res.json(201, {
          message: "Error while updating",
        });
      }
    } else {
      currentDate = new Date();
      let detail1 = {
        payin_upi: req.body.value1.payinUPI,
        payin_card: req.body.value1.PayinCard,
        payin_netbanking: req.body.value1.PayinNetbanking,
        payin_wallet: req.body.value1.PayinWallet,
        payin_qr: req.body.value1.PayinQR,
        vaoffline: req.body.value1.vaoffline,
        payout_amount: req.body.value1.PayoutAmount,
        gst_amount: req.body.value1.GstAmount,
        currency_id: req.body.value1.currency_id,
        currency_code: req.body.value1.sortname,
        user_id: id,
        created_on: currentDate
      };
      let sqlInsert = "INSERT INTO tbl_merchant_charges SET ?";
      let resultInsert = await mysqlcon(sqlInsert, [detail1]);
      if (resultInsert) {
        return res.json(200, {
          message: 'Payment Method Charges Inserted'
        });
      } else {
        return res.json(201, {
          message: 'Error inserting data'
        })
      }
    }

  } catch (error) {
    console.log(error)
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
}

module.exports.setPaymentMethod = async(req, res) => {
  try{
      let {
        id
      } = req.body;
      let updatedFields = {};
      if (req.body.value.QRCode !== undefined) {
        updatedFields.allow_qr_payment = req.body.value.QRCode;
      }
      if (req.body.value.UPI !== undefined) {
        updatedFields.allow_upi_payment = req.body.value.UPI;
      }
      if (req.body.value.Wallet !== undefined) {
        updatedFields.allow_wallet_payment = req.body.value.Wallet;
      }
      if (req.body.value.NetBanking !== undefined) {
        updatedFields.allow_netbanking_payment = req.body.value.NetBanking;
      }
      if (req.body.value.Card !== undefined) {
        updatedFields.allow_card_payment = req.body.value.Card;
      }
      if (req.body.value.Payout !== undefined) {
        updatedFields.allow_payout = req.body.value.Payout;
      }
      if (req.body.value.MidData !== undefined) {
        updatedFields.data_from_mid = req.body.value.MidData;
      }
    let sql = "UPDATE tbl_user SET ? WHERE id = ?";
    let result = await mysqlcon(sql, [updatedFields, id]);
      if (result) {
        return res.json(200, {
          message: "Payment Mode Set Successfully",
        });
      } else {
        return res.json(201, {
          message: "Payment Mode Set Successfully",
        });
      }
  }catch(error){
    console.log(error);
    return res.json(500, {
      message: "error occurred",
      error: error
    });
  }
}

module.exports.merchantCurrency = async function(req, res) {
  try {
    let {id} = req.body
    const test = "SELECT solution_apply_for_country FROM tbl_user WHERE id = ?";
    const testResult = await mysqlcon(test, [id]);
    const curr = [];

    if (testResult.length > 0 && testResult[0].solution_apply_for_country) {
      const countryList = testResult[0].solution_apply_for_country.split(',');
      for (const country of countryList) {
        const test1 = "SELECT sortname FROM countries WHERE id = ? ORDER BY name";
        const test1Result = await mysqlcon(test1, [country]);
        curr.push(test1Result[0].sortname);
      }
      return res.status(200).json({
        data: curr
      });
    } else {
      // If testResult[0] is null, show a message
      return res.status(200).json({
        message: "No currency chosen"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
}
// 🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚
