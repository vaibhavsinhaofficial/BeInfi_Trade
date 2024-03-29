const mysqlcon = require("../config/db_connection");
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');

// 👇Read Api 👇
module.exports.readBankCode = async (req, res) => {
  // 👇Pagination 👇
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  try {
      let sql =
        `select count (*) as Total from tbl_code LEFT join payment_gateway on tbl_code.payment_gate = payment_gateway.id WHERE tbl_code.type IN (${req.body.type})`;
      let sqlCount =
        `SELECT COUNT(*) AS Total FROM tbl_code LEFT JOIN payment_gateway ON tbl_code.payment_gate = payment_gateway.id WHERE tbl_code.type IN (${req.body.type}) AND (tbl_code.akontocode LIKE '%${req.body.searchItem}%' OR tbl_code.title LIKE '%${req.body.searchItem}%' OR tbl_code.code LIKE '%${req.body.searchItem}%')`;

      let result = await mysqlcon(req.body.searchItem ? sqlCount : sql);
      let total = result[0].Total;
      let page = req.body.page ? Number(req.body.page) : 1;
      let limit = req.body.limit ? Number(req.body.limit) : 10;
      let { start, numOfPages } = pagination(total, page, limit);
      

      let sql1 =
        `SELECT payment_gateway.gateway_name, tbl_code.id as identification,tbl_code.status as status2, tbl_code.type as type2, tbl_code.bank_services_charge, tbl_code.title, tbl_code.code, tbl_code.akontocode, DATE_FORMAT(tbl_code.created_on,'%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_code.updated_on,'%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_code LEFT join payment_gateway on tbl_code.payment_gate = payment_gateway.id WHERE tbl_code.type IN (${req.body.type}) ORDER BY tbl_code.created_on DESC LIMIT ?,?`;
        
      let sql2 =
        `SELECT payment_gateway.gateway_name, tbl_code.id as identification, tbl_code.status as status2, tbl_code.type as type2, tbl_code.bank_services_charge, tbl_code.title, tbl_code.code, tbl_code.akontocode, DATE_FORMAT(tbl_code.created_on, '%Y-%m-%d %H:%i:%s') AS created_on, DATE_FORMAT(tbl_code.updated_on, '%Y-%m-%d %H:%i:%s') AS updated_on FROM tbl_code LEFT JOIN payment_gateway ON tbl_code.payment_gate = payment_gateway.id WHERE tbl_code.type IN (${req.body.type}) AND (tbl_code.title LIKE '%${req.body.searchItem}%' OR tbl_code.code LIKE '%${req.body.searchItem}%') ORDER BY tbl_code.created_on LIMIT ?,?`;

      let result1 = await mysqlcon(req.body.searchItem ? sql2 : sql1, [start, limit]);

      let startRange = start + 1;
      let endRange = start + result1.length;

      return res.status(200).json({
        message: result1.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
        currentPage: page,
        totalPages: numOfPages,
        pageLimit: limit,
        data: result1,
      });
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

module.exports.merchantSelect = async function (req, res) {
  try {
    let sql = "SELECT id as value, CONCAT('(', id, ') ', name) as label from tbl_user WHERE status = 1 AND complete_profile = 1"
    let result = await mysqlcon(sql)
    return res.json(200, {
      result
    });
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// 👇 type 1 Api 👇
module.exports.readType1BankCode = async function (req, res) {
  try {
    let {value} = req.body
    let type;
    if(value === "10"){
      type = 1
      let sql = `SELECT id ,gateway_name FROM payment_gateway WHERE type = ${type}`;
      let result = await mysqlcon(sql);
      return res.json(200, {
        data: result,
      });
    } else {
      type = 0
      let sql = `SELECT id ,gateway_name FROM payment_gateway WHERE type = ${type}`;
      let result = await mysqlcon(sql);
      return res.json(200, {
        data: result,
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};
// 👇 type 2 Api 👇
module.exports.readType2BankCode = async function (req, res) {
  try {
    let {value} = req.body
    let type;
    if(value === "10"){
      type = 1
      let sql = `SELECT code,title FROM tbl_akonto_banks_code WHERE type = ${type}`;
      let result = await mysqlcon(sql);
      return res.json(200, {
        data: result,
      });
    } else {
      type = 0
      let sql = `SELECT code,title FROM tbl_akonto_banks_code WHERE type = ${type}`;
      let result = await mysqlcon(sql);
      return res.json(200, {
        data: result,
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

module.exports.updateBankCode = async function (req, res) {
  try {
    const {
      id,
      type,
      akontocode,
      payment_gate,
      bank_services_charge,
      title,
      code,
      branch_code,
      mer_no,
    } = req.body;

    const details = {
      type,
      akontocode,
      payment_gate,
      bank_services_charge,
      title,
      code,
      branch_code,
      updated_on: formattedIST,
    };

    if (!id) {
      return res.status(205).json({
        message: "Kindly Provide Id",
      });
    }

    const sqlUpdateCode = "UPDATE tbl_code SET ? WHERE id = ?";
    const resultUpdateCode = await mysqlcon(sqlUpdateCode, [details, id]);

    if (resultUpdateCode) {
      for (const merchantId of mer_no) {
        const assignData = await mysqlcon("SELECT * FROM tbl_merchant_assign WHERE a_code = ? AND mer_no = ?", [akontocode, merchantId]);

        const assignDetails = {
          type,
          a_code: akontocode,
          b_code: code,
          mer_no: merchantId,
          updated_on: formattedIST,
        };

        if (assignData.length > 0) {
          // Update existing record in tbl_merchant_assign
          const sqlAssignUpdate = "UPDATE tbl_merchant_assign SET ? WHERE a_code = ? AND mer_no = ?";
          await mysqlcon(sqlAssignUpdate, [assignDetails, akontocode, merchantId]);
        } else {
          // Insert new record into tbl_merchant_assign
          assignDetails.created_on = formattedIST;
          const sqlAssignInsert = "INSERT INTO tbl_merchant_assign SET ?";
          await mysqlcon(sqlAssignInsert, [assignDetails]);
        }

        // Update tbl_user table with the modified bankId values
        const sqlSelectUser = "SELECT bankId FROM tbl_user WHERE id = ?";
        const resultSelectUser = await mysqlcon(sqlSelectUser, [merchantId]);
        let bankIdArray = resultSelectUser[0].bankId.split(',').map(item => item.trim());

        if (!bankIdArray.includes(akontocode)) {
          bankIdArray.push(akontocode);
        }

        const bankIdString = bankIdArray.join(', ');

        // Update the tbl_user table with the modified bankId values
        const sqlUpdateUser = "UPDATE tbl_user SET bankId = ? WHERE id = ?";
        await mysqlcon(sqlUpdateUser, [bankIdString, merchantId]);
      }

      return res.status(200).json({
        message: "Bankcodes Updated ✅",
      });
    } else {
      return res.status(201).json({
        message: "Error while updating",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error occurred",
      error: error,
    });
  }
};

// Read Update Api 👇
module.exports.readUpdateBankCode = async function (req, res) {
  try {
    let { id, type } = req.body;
    console.log(id);
    let sql = `SELECT payment_gateway.id AS gateway_name, GROUP_CONCAT(tbl_merchant_assign.mer_no) AS merNo, tbl_code.id AS identification, tbl_code.status AS status2, tbl_code.type AS type2, tbl_code.bank_services_charge, tbl_code.title, tbl_code.code, tbl_code.akontocode, tbl_code.branch_code FROM tbl_code LEFT JOIN payment_gateway ON tbl_code.payment_gate = payment_gateway.id LEFT JOIN tbl_merchant_assign ON tbl_code.akontocode = tbl_merchant_assign.a_code WHERE tbl_code.type IN (${type}) AND tbl_code.id = ? GROUP BY tbl_code.id, tbl_code.status, tbl_code.type, tbl_code.bank_services_charge, tbl_code.title, tbl_code.code, tbl_code.akontocode, tbl_code.branch_code`;
    let result = await mysqlcon(sql, [id]);
    return res.json(200, {
      data: result,
    });
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};
// 👇Delete Api 👇
module.exports.deleteBankCode = async function (req, res) {
  try {
    let { id, akontocode, code } = req.body;
    let sql = "DELETE FROM tbl_code WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    if (result) {
      let sqlSelect = "SELECT mer_no from tbl_merchant_assign WHERE a_code = ?";
      let resultData = await mysqlcon(sqlSelect, [akontocode]);
      let merNos = resultData.map(item => item.mer_no);
      for (let i = 0; i < merNos.length; i++) {
        let mer_no = merNos[i];
        let sqlSelectUser = "SELECT bankId from tbl_user WHERE id = ?";
        let resultUser = await mysqlcon(sqlSelectUser, [mer_no]);
        let bankIdArray = resultUser[0].bankId.split(',').map(item => item.trim());
        
        if (bankIdArray.includes(code)) {
          bankIdArray = bankIdArray.filter(item => item !== code);
          let updatedBankIdString = bankIdArray.join(', ');
          let sqlUpdate = "UPDATE tbl_user SET bankId = ? WHERE id = ?";
          await mysqlcon(sqlUpdate, [updatedBankIdString, mer_no]);
        }
      }
      let sqlDelete = "DELETE FROM tbl_merchant_assign WHERE a_code = ?";
      let resultDelete = await mysqlcon(sqlDelete, [akontocode]);
      return res.json(200, {
        message: "Delete Successfully✅",
      });
    } else {
      return res.json(201, {
        message: "Error while Deleting",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "error occurred",
      error: error,
    });
  }
};

// 👇 Create Api👇
module.exports.createBankCode = async function (req, res) {
  try {
    let { type, akontocode, payment_gate, bank_services_charge, title, code, branch_code, mer_no } = req.body;
    let details = {
      type,
      akontocode,
      payment_gate,
      bank_services_charge,
      title,
      code,
      branch_code,
      created_on: formattedIST,
      updated_on: formattedIST
    };

    let sql = "INSERT INTO tbl_code SET ?";
    let result = await mysqlcon(sql, [details]);

    for (let i = 0; i < mer_no.length; i++) {
      let assignDetails = {
        type,
        a_code: akontocode,
        b_code: code,
        mer_no: mer_no[i],
        created_on: formattedIST,
        updated_on: formattedIST
      };
      let sqlAssign = "INSERT INTO tbl_merchant_assign SET ?";
      let resultAssign = await mysqlcon(sqlAssign, [assignDetails]);

      let sqlSelect = "SELECT bankId from tbl_user WHERE id = ?";
      let resultSelect = await mysqlcon(sqlSelect, [mer_no[i]]);

      let bankIdArray = resultSelect[0].bankId.split(',').map(item => item.trim());

      if (!bankIdArray.includes(akontocode)) {
        bankIdArray.push(akontocode);
      }

      let bankIdString = bankIdArray.join(', ');

      // Update the tbl_user table with the modified bankId values
      let sqlUpdate = "UPDATE tbl_user SET bankId = ? WHERE id = ?";
      await mysqlcon(sqlUpdate, [bankIdString, mer_no[i]]);
    }

    if (result) {
      return res.json(200, {
        message: "Bankcodes Added✅",
      });
    } else {
      return res.json(201, {
        message: "Error While Creating",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};
// 👇 TOGGLE Api👇
module.exports.toggleBankCode = async function (req, res) {
  try {
    let { id, status, akontocode } = req.body;
    let sql = "UPDATE tbl_code SET status = ? WHERE id = ?";
    await mysqlcon(sql, [status, id]);
    let sqlCode = `SELECT mer_no FROM tbl_merchant_assign WHERE a_code = '${akontocode}'`;
    let codeResult = await mysqlcon(sqlCode)
    let merNumbers = codeResult.map(result => result.mer_no);
    if(status === "1"){
      for (let i = 0; i < merNumbers.length; i++) {
        let sqlSelect = "SELECT bankId from tbl_user WHERE id = ?";
        let resultSelect = await mysqlcon(sqlSelect, [merNumbers[i]]);
        let bankIdArray = resultSelect[0].bankId.split(',').map(item => item.trim());
        if (!bankIdArray.includes(akontocode)) {
          bankIdArray.push(akontocode);
        }
        let bankIdString = bankIdArray.join(', ');
        // Update the tbl_user table with the modified bankId values
        let sqlUpdate = "UPDATE tbl_user SET bankId = ? WHERE id = ?";
        await mysqlcon(sqlUpdate, [bankIdString, merNumbers[i]]);
        let updateMerchant = `UPDATE tbl_merchant_assign set status = ${status} WHERE a_code = '${akontocode}'`
        await mysqlcon(updateMerchant)
      }
      return res.json(200, {
        message: "Status Enabled Successfully✅",
      });
    } else {
      for (let i = 0; i < merNumbers.length; i++) {
        let mer_no = merNumbers[i];
        let sqlSelectUser = "SELECT bankId from tbl_user WHERE id = ?";
        let resultUser = await mysqlcon(sqlSelectUser, [mer_no]);
        let bankIdArray = resultUser[0].bankId.split(',').map(item => item.trim());
        if (bankIdArray.includes(akontocode)) {
          bankIdArray = bankIdArray.filter(item => item !== akontocode);
          let updatedBankIdString = bankIdArray.join(', ');
          let sqlUpdate = "UPDATE tbl_user SET bankId = ? WHERE id = ?";
          await mysqlcon(sqlUpdate, [updatedBankIdString, mer_no]);
          let updateMerchant = `UPDATE tbl_merchant_assign set status = ${status} WHERE a_code = '${akontocode}'`
          await mysqlcon(updateMerchant)
        }
      }
      return res.json(200, {
        message: "Status Disabled Successfully✅",
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

module.exports.merchantData = async function (req,res) {
  try {
    let {akontocode} = req.body
    let sql = "SELECT tbl_user.name, tbl_merchant_assign.* from tbl_merchant_assign INNER JOIN tbl_user ON tbl_user.id = tbl_merchant_assign.mer_no WHERE tbl_merchant_assign.a_code = ?"
    let result = await mysqlcon(sql, [akontocode])
    return res.status(200).json({
      result
    });
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
}

module.exports.toggleMerchantBankCodes = async function (req, res) {
  try {
    let { id, status, akontocode } = req.body;
    let sql = "UPDATE tbl_merchant_assign SET status = ? WHERE id = ?";
    let result = await mysqlcon(sql, [status, id]);
    if(result){
      if(status === "0"){
        let sqlSelect = "SELECT mer_no from tbl_merchant_assign WHERE id = ?";
        let resultData = await mysqlcon(sqlSelect, [id]);
        let mer_no = resultData[0].mer_no;
        
        let sqlSelectUser = "SELECT bankId from tbl_user WHERE id = ?";
        let resultUser = await mysqlcon(sqlSelectUser, [mer_no]);
        let bankIdArray = resultUser[0].bankId.split(',').map(item => item.trim());
        if (bankIdArray.includes(akontocode)) {
          bankIdArray = bankIdArray.filter(item => item !== akontocode);
          let updatedBankIdString = bankIdArray.join(', ');
          let sqlUpdate = "UPDATE tbl_user SET bankId = ? WHERE id = ?";
          await mysqlcon(sqlUpdate, [updatedBankIdString, mer_no]);
        }
        return res.json(200, {
          message: "Bankcodes Disabled Successfully✅",
        });
      } else {
        let sqlSelect = "SELECT mer_no from tbl_merchant_assign WHERE id = ?";
        let resultData = await mysqlcon(sqlSelect, [id]);
        let mer_no = resultData[0].mer_no;
        
        let sqlSelects = "SELECT bankId from tbl_user WHERE id = ?";
        let resultSelect = await mysqlcon(sqlSelects, [mer_no]);
        let bankIdArray = resultSelect[0].bankId.split(',').map(item => item.trim());
        
        if (!bankIdArray.includes(akontocode)) {
            bankIdArray.push(akontocode);
          }
          
        let bankIdString = bankIdArray.join(', ');
  
        // // Update the tbl_user table with the modified bankId values
        let sqlUpdate = "UPDATE tbl_user SET bankId = ? WHERE id = ?";
        await mysqlcon(sqlUpdate, [bankIdString, mer_no]);
        return res.json(200, {
          message: "Bankcodes Enabled Successfully✅",
        });
      }
    } else {
      return res.json(201, {
        message: "Error While Updating",
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

// module.exports.deleteMerchantBankCode = async function (req, res) {
//   try {
//     let { id, code } = req.body;

//     let sqlSelect = "SELECT mer_no from tbl_merchant_assign WHERE id = ?";
//     let resultData = await mysqlcon(sqlSelect, [id]);
//     let mer_no = resultData[0].mer_no;

//     let sqlSelectUser = "SELECT bankId from tbl_user WHERE id = ?";
//     let resultUser = await mysqlcon(sqlSelectUser, [mer_no]);
//     let bankIdArray = resultUser[0].bankId.split(',').map(item => item.trim());
    
//     if (bankIdArray.includes(code)) {
//       bankIdArray = bankIdArray.filter(item => item !== code);
//       let updatedBankIdString = bankIdArray.join(', ');
//       let sqlUpdate = "UPDATE tbl_user SET bankId = ? WHERE id = ?";
//       await mysqlcon(sqlUpdate, [updatedBankIdString, mer_no]);
//     }
//     let sql = "DELETE FROM tbl_merchant_assign WHERE id = ?";
//     let result = await mysqlcon(sql, [id]);
//     if (result) {
//       return res.json(200, {
//         message: "Bankcodes Deleted Successfully✅",
//       });
//     } else {
//       return res.json(201, {
//         message: "Error while Deleting",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json(500, {
//       message: "error occurered",
//       error: error,
//     });
//   }
// };

// 🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚
