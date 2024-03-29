const mysqlcon = require("../../config/db_connection");
const currentUTC = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; 
const istTime = new Date(currentUTC.getTime() + istOffset);
const formattedIST = istTime.toISOString().slice(0, 19).replace('T', ' ');

// Default Api 👇

module.exports.defaultAllUpi = async (req, res) => {
  // 👇Pagination 👇
  let pagination = (total, page, limit) => {
    let numOfPages = Math.ceil(total / limit);
    let start = page * limit - limit;
    return { limit, start, numOfPages };
  };

  try {
    let searchItem = req.body.searchItem;
    let sql = "select count (*) as Total from tbl_upi_block";
    let sqlCount =
      "select count (*) as Total FROM tbl_upi_block WHERE merchant_id LIKE '%" +
      searchItem +
      "%' OR  upi_id  LIKE '%" +
      searchItem +
      "%'";

    let result = await mysqlcon(searchItem ? sqlCount : sql);
    let total = result[0].Total;
    let page = req.body.page ? Number(req.body.page) : 1;
    let limit = req.body.limit ? Number(req.body.limit) : 10;
    let { start, numOfPages } = pagination(total, page, limit);

    let sql1 = "SELECT *, DATE_FORMAT(create_on,'%Y-%m-%d %H:%i:%s') AS create_on, DATE_FORMAT(update_on,'%Y-%m-%d %H:%i:%s') AS update_on FROM tbl_upi_block ORDER BY create_on DESC LIMIT ?,?";
    let sql2 =
      "SELECT *, DATE_FORMAT(create_on,'%Y-%m-%d %H:%i:%s') AS create_on, DATE_FORMAT(update_on,'%Y-%m-%d %H:%i:%s') AS update_on FROM tbl_upi_block WHERE merchant_id LIKE '%" +
      searchItem +
      "%' OR  upi_id  LIKE '%" +
      searchItem +
      "%' ORDER BY create_on DESC LIMIT ?,?";

    let result1 = await mysqlcon(searchItem ? sql2 : sql1, [start, limit]);
    
    let startRange = start + 1;
    let endRange = start + result1.length;

    return res.json(200, {
      message: result1.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
      currentPage: page,
      totalPages: numOfPages,
      pageLimit: limit,
      data: result1,
    });
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
};

// 👇 Create Api👇
module.exports.createAllUpi = async function (req, res) {
  try {
    let { id, upi_id, reason } = req.body;

    let merchant_id = id;
    let upi_no = upi_id.slice(0, -4);
    let details = {
      merchant_id,
      upi_id,
      upi_no,
      reason,
      create_on:formattedIST,
      update_on:formattedIST
    };

    let sql = "INSERT INTO tbl_upi_block SET ?, create_on = NOW(), update_on = NOW()";

    let result = await mysqlcon(sql, [details]);

    if (result) {
      return res.json(200, {
        message: "Data Inserted Successfully✅",
      });
    } else {
      return res.json(201, {
        message: "Error While Creating",
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

// 👇 toggle status Api👇
module.exports.toggleUpi = async function (req, res) {
  try {
    let { status, id } = req.body;

    let sql = "UPDATE tbl_upi_block SET status = ? WHERE id = ?";  // (1 unblock 0 block)
    let result = await mysqlcon(sql, [status, id]);
    if (result.affectedRows > 0) {
      return res.json(200, {
        message: `Status ${
          status === "1" ? "Unblock" : "Block"
        } Successfully `,
        data: result
        // sql,
      });
    } else {
      return res.json(201, {
        message: "Error while Changing Status",
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

module.exports.readUpi = async (req,res) =>{
  try{
    const {id} = req.body

    let sql = "SELECT * FROM tbl_upi_block WHERE id = ?"
    let result  = await mysqlcon(sql,[id])

    return res.json(200,{
      data : result
    })

  }catch(error){
    return res.json(500,{
      message : 'error'
    })
  }
}

module.exports.update_upi = async function (req, res){
  try{
    let { id,upi_id,reason} = req.body;
    console.log(req.body)
    let sqlId = "SELECT id,name FROM tbl_user "
    let resultId = await mysqlcon(sqlId)
    let details = {
      upi_id,
      reason,
      update_on: formattedIST
    }
    let sql = "UPDATE tbl_upi_block SET ? Where id = ?";
    let result = await mysqlcon(sql, [details, id]);
    if (result.affectedRows > 0) {
      return res.json(200, {
        message: "Data Updated Sucessfull ✅",
        mId : resultId
      });
    }else {
      return res.json(201, {
        message: "Error while Changing ",
        data: result,
      });
    }
  } catch (error) {
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }
}

module.exports.delete_upi = async function (req, res){
  try{
    let{id}=req.body

    let sql= "DELETE FROM tbl_upi_block WHERE id = ?";
    let result = await mysqlcon(sql, [id]);
    if (result.affectedRows > 0) {
      return res.json(200, {
        message: "Data Deleted Sucessfully ✅"
      });
    }else {
      return res.json(201, {
        message: "Error while Deleteing ",
      });
    }
    
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "error occurered",
      error: error,
    });
  }

}
// 🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚
