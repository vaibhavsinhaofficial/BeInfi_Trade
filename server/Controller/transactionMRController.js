const mysqlcon = require('../config/db_connection');


let pagination = (total,page,limit)=>{
    

    let numOfPages = Math.ceil(total / limit)
    let start = ((page * limit) - (limit))

    return {limit,start,numOfPages}
}


module.exports.defaultMR = async function(req,res){
    try {
        let pagination = (total, page, limit) => {
          let numOfPages = Math.ceil(total / limit);
          let start = page * limit - limit;
          return { limit, start, numOfPages };
        };
        let {to, from, searchText} = req.body;
    
        let sqlCount = "SELECT COUNT(*) AS Total from user_request LEFT JOIN tbl_user ON tbl_user.id = user_request.id"
    
        let sqlSearchCount ="SELECT COUNT(*) AS Total from user_request LEFT JOIN tbl_user ON tbl_user.id = user_request.id WHERE user_request.request_id LIKE '%" +
        searchText +
        "%' OR  user_request.invoice_Id  LIKE '%" +
        searchText +
        "%'";
    
        let sqlToFromCount = "SELECT COUNT(*) AS Total from user_request LEFT JOIN tbl_user ON tbl_user.id = user_request.id where DATE(user_request.created_on)  >= ? AND DATE(user_request.created_on) <= ?";
    
        let result = await mysqlcon(
          to && from
          ? sqlToFromCount
          : searchText
          ? sqlSearchCount
          : sqlCount,
          to && from
          ? [from, to]
          : searchText
          ? [searchText]
          : []
        );
    
        let total = result[0].Total;
        let page = req.body.page ? Number(req.body.page) : 1;
        let limit = req.body.limit ? Number(req.body.limit) : 10;
        let { start, numOfPages } = pagination(total, page, limit);

        let sql = "SELECT tbl_user.name, user_request.*, DATE_FORMAT(user_request.created_on,'%Y-%m-%d %H:%i:%s') AS created_on from user_request LEFT JOIN tbl_user ON tbl_user.id = user_request.merchant_id ORDER BY user_request.created_on DESC LIMIT ?,?"

        let sqlSearch ="SELECT tbl_user.name, user_request.*, DATE_FORMAT(user_request.created_on,'%Y-%m-%d %H:%i:%s') AS created_on from user_request LEFT JOIN tbl_user ON tbl_user.id = user_request.merchant_id WHERE user_request.request_id LIKE '%" +
        searchText +
        "%' OR  user_request.invoice_Id  LIKE '%" +
        searchText +
        "%'";

        let sqlToFrom = "SELECT tbl_user.name, user_request.*, DATE_FORMAT(user_request.created_on,'%Y-%m-%d %H:%i:%s') AS created_on from user_request LEFT JOIN tbl_user ON tbl_user.id = user_request.merchant_id where DATE(user_request.created_on)  >= ? AND DATE(user_request.created_on) <= ? LIMIT ?,?";

        let result1 = await mysqlcon(
        to && from
        ? sqlToFrom
        : searchText
        ? sqlSearch
        : sql,
        to && from
        ? [from, to, start, limit]
        : searchText
        ? [searchText, start, limit]
        : [start, limit]
        );

        let startRange = start + 1;
        let endRange = start + result1.length;

        return res.json(200, {
            message: result1.length > 0 ? `Showing ${startRange} to ${endRange} data from ${total}` : "NO DATA",
            currentPage: page,
            totalPages: numOfPages,
            pageLimit: limit,
            data: result1,
        });
    
    } catch(err){
        console.log(err)
        res.status(500).json({
            message:"Server Error",
            err,
        })
    }

}

module.exports.downloadAdminRefund = async function(req, res){
    try {
        let {to, from, searchText} = req.body;
        let sql = "SELECT tbl_user.name, user_request.* from user_request LEFT JOIN tbl_user ON tbl_user.id = user_request.id"

        let sqlSearch ="SELECT tbl_user.name, user_request.* from user_request LEFT JOIN tbl_user ON tbl_user.id = user_request.id WHERE user_request.request_id LIKE '%" +
        searchText +
        "%' OR  user_request.invoice_Id  LIKE '%" +
        searchText +
        "%'";

        let sqlToFrom = "SELECT tbl_user.name, user_request.* from user_request LEFT JOIN tbl_user ON tbl_user.id = user_request.id where DATE(user_request.created_on)  >= ? AND DATE(user_request.created_on) <= ?";

        let result = await mysqlcon(
            to && from
            ? sqlToFrom
            : searchText
            ? sqlSearch
            : sql,
            to && from
            ? [from, to]
            : searchText
            ? [searchText]
            : []
        );
        res.send(result)
    } catch (error) {
        console.log(error)
        return res.json({
            message : 'error'
        })
    }
}


module.exports.toggleMR = async function(req,res){
    try {


            let sql = "UPDATE user_request set status = ? "
        
    } catch (error) {

        return res.json(500,{
            message: "error occurered",
            error: error
        })
        
    }
}