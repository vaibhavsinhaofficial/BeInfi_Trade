const mysqlcon = require('../../../config/db_connection')

module.exports.dashboardTable = async (req, res) => {
    try {
        let sql = "SELECT user.name, SUM(settlement.requestedAmount) as amount FROM tbl_settlement settlement INNER JOIN tbl_user user ON settlement.user_id = user.id WHERE settlement.status = 1 AND settlement.settlement_mode = 1 GROUP BY user.name ORDER BY amount DESC LIMIT 0,10"
        let sql2 = "SELECT user.name, SUM(settlement.requestedAmount) as amount FROM tbl_settlement settlement INNER JOIN tbl_user user ON settlement.user_id = user.id WHERE settlement.status = 1 AND settlement.settlement_mode = 2 GROUP BY user.name ORDER BY amount DESC LIMIT 0,10"
        let sql3 = "SELECT name, MAX(amount) as amount, currency FROM ( SELECT user.name, settlement.requestedAmount as amount, settlement.fromCurrency as currency FROM tbl_settlement settlement INNER JOIN tbl_user user ON settlement.user_id = user.id WHERE settlement.status = 1 GROUP BY user.name, settlement.fromCurrency, settlement.requestedAmount ) tbl GROUP BY currency, name";
        let topLocal = await mysqlcon(sql);
        let topInternational = await mysqlcon(sql2);
        let result = await mysqlcon(sql3);
        let curSql = "SELECT sortname, symbol FROM countries WHERE status = 1"
        let curResult = await mysqlcon(curSql)
        let currencies = curResult.map(row => row.sortname);
        topCurrency = currencies.map(x=>({
            name: result.filter(item=> item.currency === x).reduce((a, b) => { return b.name }, 'NA'),
            amount: result.filter(item=> item.currency === x).reduce((a, b) => { return b.amount }, '0'),
            currency : x
        }))
        return res.status(200).json({
            status: true,
            data: {
                topLocal: topLocal,
                topInternational: topInternational,
                topCurrency: topCurrency
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error occured",
            error: error
        })
    }
}