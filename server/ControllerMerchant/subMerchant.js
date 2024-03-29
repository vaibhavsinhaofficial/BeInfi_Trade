const mysqlcon = require("../config/db_connection");
const path = require('path');
const ejs = require('ejs');
const md5 =require('md5');
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');
const send_mail = require('../helper/send-mail');

module.exports.subMerchant = async (req, res) => {
  try {
    const { id } = req.user;
    const page = req.body.page ? Number(req.body.page) : 1;
    const limit = req.body.limit ? Number(req.body.limit) : 10;
    const start = (page - 1) * limit + 1;
    const end = start + limit - 1;

    const countSql = "SELECT COUNT(*) AS Total FROM tbl_user WHERE parent_id = ? AND account_type = 0";
    const result = await mysqlcon(countSql, [id]);
    const total = result[0].Total;

    const selectSql = "SELECT tbl_user.*, DATE_FORMAT(tbl_user.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_user.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_user WHERE parent_id = ? AND account_type = 0 ORDER BY created_on DESC LIMIT ?, ?";
    const users = await mysqlcon(selectSql, [id, start - 1, limit]);

    const rangeStart = start > total ? total : start;
    const rangeEnd = end > total ? total : end;

    const message = `Showing ${rangeStart} to ${rangeEnd} out of ${total} results`;
    const response = {
      message,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      pageLimit: limit,
      data: users,
    };

    return res.json(200, response);
  } catch (error) {
    return res.json(500, {
      message: "Error occurred",
      error: error,
    });
  }
};

module.exports.getIdSubmerchant = async function (req, res) {
  try {
    let { id } = req.body;

    let sql= "SELECT id, status, account_type,name,fname,lname,parent_id,email,created_on,mobile_no,allow_webpayment,settle_currency,bname,blocation,apv,ata,charge_back_per,currencies_req,job_title,website from tbl_user WHERE id = ?"
    let result = await mysqlcon(sql, [id]);
    if (result.length !== 0) {
      return res.json(200, {
        message: `Records for id =  ${id}`,
        data: result,
      });
    } else {
      return res.json(201, {
        message: `No Record Found`,
        data: result[0],
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

module.exports.createMerchant = async (req, res) => {
  try {
    let {id} = req.user;
    const crypto = require ('crypto');
    let parent_id = id;
    let secretkey = crypto.randomBytes(4).toString('hex');
    let created_on = new Date();
    if(!req.body.FirstName || !req.body.LastName || !req.body.Email || !req.body.SettleCurrency || !req.body.MobileNo ) {
      return res.status(400).json ({
        message : " All Fields are Requried "
      })
  }
    const defaultPassword = Math.random().toString(36).slice();
    const Password = md5(defaultPassword)
    let details = { 
      fname:req.body.FirstName,
      lname:req.body.LastName,
      email:req.body.Email,
      mobile_no:req.body.MobileNo,
      parent_id,
      name:`${req.body.FirstName} ${req.body.LastName}`,
      settle_currency:req.body.SettleCurrency,
      bname:req.body.BusinessName,
      blocation:req.body.BusinessLocation,
      job_title:req.body.JobTitle,
      website:req.body.Website,
      apv:req.body.AnnualProcessingVolume,
      ata:req.body.AverageTransactionAmount,
      charge_back_per:req.body.chargebackpercentage,
      currencies_req:req.body.CurrenciesRequire,
      secretkey,
      account_type: 0,
      password : Password,
      created_on : formattedIST
    }
    console.log(req.body)
    let sqlcreateMerchant = "INSERT INTO tbl_user SET ?";
    let data=  await mysqlcon(sqlcreateMerchant,[details])
    
    if(!data){
      return res.json(201,{
          message:'Error in Creating Sub Merchant ❌',
      });
    } else{
      var page_path = path.join(__dirname, '../views/submerchant.ejs');
      console.log(page_path);
      let name = `${req.body.FirstName} ${req.body.LastName}`;
      send_mail.mail({email: req.body.Email,mobile_no: req.body.MobileNo,name : name, usercode: "Sub Merchant",Password : defaultPassword,subject:"Sub Merchant Create"}, 'submerchant');
      return res.json(200,{
          message:"Sub Merchant Added "
      })
  }
  
  } catch(error) {
  console.log(error)
    {
      res.status(500).json({message:"Somthing Went wrong",error})
    }
  }
}