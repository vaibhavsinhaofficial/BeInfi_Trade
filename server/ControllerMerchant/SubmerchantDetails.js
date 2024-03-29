const mysqlcon = require("../config/db_connection");

module.exports.details = async (req, res) => {
    try {
      const {id} = req.user;
      // console.log(id);
  
      let sql1 = "SELECT id, name from tbl_user where parent_id = ? And account_type = 0";
      let result1 = await mysqlcon(sql1, [id]);

      let sqlID = "SELECT GROUP_CONCAT(id) AS concatenated_ids from tbl_user where parent_id = ? And account_type = 0";
      let resultID = await mysqlcon(sqlID, [id]);
      
      let submerchants = resultID[0].concatenated_ids

      resultID.forEach(row => {
        row.concatenated_ids = id + ',' + row.concatenated_ids;
      });

      let allAccount = resultID[0].concatenated_ids
      
      if (result1.length === 0) {
        return res.json(201, {
          data: result1
        });
      } else {
        return res.json(200, {
          data: result1,
          allAccount,
          submerchants,
          id: id
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
