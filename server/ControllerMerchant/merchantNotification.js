const mysqlcon = require("../config/db_connection");

module.exports.merchantNotificationBell = async (req, res) => {
    try {
        // type(1- admin) //

        let sqlCount = "SELECT count(*) AS count from tbl_notification WHERE status = 1 AND type = 1"
        let sql = "SELECT * from tbl_notification WHERE status = 1 AND type = 1"
        let resultCount = await mysqlcon(sqlCount);
        let result = await mysqlcon(sql);
        return res.json(200, {
            resultCount,
            result
        });
    } catch (error) {
        console.log(error)
        return res.json(500, {
            message: "error occurered",
            error: error,
        });
    }
}

module.exports.toggleNotification = async function (req, res) {
    try {
        let { status, id } = req.body;
        let sql = "UPDATE tbl_notification SET status = ? WHERE id = ?";
        let result = await mysqlcon(sql, [status, id]);
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

module.exports.merchantNotification = async function(req, res) {
    // 👇Pagination 👇
    let pagination = (total, page, limit) => {
        let numOfPages = Math.ceil(total / limit);
        let start = page * limit - limit;
        return { limit, start, numOfPages };
    };

    try {
        let sqlCount = "select count (*) as Total from tbl_notification WHERE user_id = ? AND type = 1";
        let resultCount = await mysqlcon(sqlCount, [req.user.id]);

        let total = resultCount[0].Total;
        let page = req.body.page ? Number(req.body.page) : 1;
        let limit = req.body.limit ? Number(req.body.limit) : 10;
        let { start, numOfPages } = pagination(total, page, limit);
        
        let sql = "SELECT title, message, created_on from tbl_notification WHERE user_id = ? AND type = 1 ORDER BY created_on DESC limit ?,?"
        let result = await mysqlcon(sql, [req.user.id, start, limit]);

        return res.json(201, {
            message: `Showing ${result.length} from ${total} data `,
            currentPage: page,
            totalPages: numOfPages,
            pageLimit: limit,
            data: result,
        });

    } catch (error) {
        console.log(error)
        return res.json(500, {
            message: "error occurered",
            error: error,
        });
    }
}