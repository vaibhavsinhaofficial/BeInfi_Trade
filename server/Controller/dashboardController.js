const mysqlcon = require("../config/db_connection");

const getSixMonthsAgoDate = () => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return sixMonthsAgo;
};

// const baseURL=require('../../client/public/imges')

//DashboardCard API
module.exports.dashboard_cardData = async (req, res) => {
    try {
        // Calculate the date 6 months ago
        const sixMonthsAgo = getSixMonthsAgoDate();

        // Database queries
        const queries = [
            { sql: 'SELECT SUM(ammount) AS merchant_transactions_sum FROM tbl_merchant_transaction WHERE status = 1 AND created_on >= ?', params: [sixMonthsAgo] },
            { sql: 'SELECT SUM(amount) AS icici_sum FROM tbl_icici_payout_transaction_response_details WHERE status = "success" AND created_on >= ?', params: [sixMonthsAgo] },
            { sql: 'SELECT SUM(settlementAmount) AS settlement_sum FROM tbl_settlement WHERE status = 1 AND (settlement_mode = 1 OR settlement_mode = 2)', params: [sixMonthsAgo] }
        ];

        // Execute all queries concurrently
        const results = await Promise.all(queries.map(({ sql, params }) => mysqlcon(sql, params)));

        // Extract sums from query results and format them
        const formatValue = (value) => parseFloat(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const responseData = {
            merchant_transactions_sum: formatValue(results[0][0]?.merchant_transactions_sum),
            icici_sum: formatValue(results[1][0]?.icici_sum),
            settlement_sum: formatValue(results[2][0]?.settlement_sum)
        };

        // Determine message
        const message = Object.values(responseData).some(value => value !== '0.00') ? "Data found" : "No Record Found";

        // Send the response
        res.status(200).json({ message, data: responseData });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//PieGraph API
module.exports.piegraph_data = async (req, res) => {
    try {
        // Calculate the date 6 months ago
        const sixMonthsAgo = getSixMonthsAgoDate();

        // Query for total amount for each status
        const query = `
            SELECT 
                status, 
                COALESCE(SUM(ammount), 0) AS total_amount 
            FROM 
                tbl_merchant_transaction 
            WHERE 
                created_on >= ? 
            GROUP BY 
                status
        `;
        const params = [sixMonthsAgo];

        // Execute query
        const results = await mysqlcon(query, params);

        // Format response data
        const responseData = {};
        const statuses = [0, 1, 2, 3, 4, 5];
        for (const status of statuses) {
            const row = results.find(row => row.status === status);
            const totalAmount = parseFloat(row?.total_amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            responseData[`status_${status}_sum`] = totalAmount;
        }

        // Send the response
        const message = Object.values(responseData).some(value => value !== '0.00') ? "Data found" : "No Record Found";
        res.status(200).json({ message, data: responseData });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//Currency BarGraph API
module.exports.currency_data = async (req, res) => {
    try {
        // Calculate the date 6 months ago
        const sixMonthsAgo = getSixMonthsAgoDate();

        // Fetch data from countries, merchant transactions, and payout transaction details tables
        const [countries, deposits, payouts] = await Promise.all([
            mysqlcon('SELECT sortname AS Name , image, symbol FROM countries WHERE status=1'),
            mysqlcon('SELECT ammount_type, SUM(ammount) AS total_amount FROM tbl_merchant_transaction WHERE status=1 AND ammount_type IS NOT NULL AND created_on >= ? GROUP BY ammount_type', [sixMonthsAgo]),
            mysqlcon('SELECT currency, SUM(amount) AS total_amount FROM tbl_icici_payout_transaction_response_details WHERE status=\'SUCCESS\' AND currency IS NOT NULL AND created_on >= ? GROUP BY currency', [sixMonthsAgo])
        ]);

        // Create mapping objects for easy lookup
        const depositsMap = Object.fromEntries(deposits.map(({ ammount_type, total_amount }) => [ammount_type, parseFloat(total_amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })]));
        const payoutsMap = Object.fromEntries(payouts.map(({ currency, total_amount }) => [currency, parseFloat(total_amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })]));

        // Match currencies with deposits and payouts
        const matchedData = countries.map(({ Name, image, symbol }) => {
            const depositsValue = depositsMap[Name] || 0;
            const payoutsValue = payoutsMap[Name] || 0;

            return {
                currency: {
                    Name,
                    Image: image // Include the image URL with sortname
                },
                Deposits: `${symbol} ${depositsValue}`,
                Payouts: `${symbol} ${payoutsValue}`
            };
        });

        // Send the response with the matched data
        res.status(200).json({
            data: matchedData,
            currencylength: matchedData.length
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


//Top Vendors BarGraph API
// module.exports.vendorsData = async (req, res) => {
//     try {
//         const sixMonthsAgo = new Date();
//         sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

//         const sql = `
//         SELECT t.gatewayNumber AS merchantGatewayNumber, p.id AS gatewayId, 
//         FORMAT(SUM(t.ammount), 2) AS totalAmount, p.gateway_name 
//         FROM tbl_merchant_transaction t
//         JOIN payment_gateway p ON t.gatewayNumber = p.id
//         WHERE t.created_on >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
//         GROUP BY t.gatewayNumber, p.id, p.gateway_name
//         ORDER BY SUM(t.ammount) DESC
//         LIMIT 10;
//         `;

//         // Execute the SQL query
//         const result = await mysqlcon(sql);

//         // Send the response with the data
//         res.status(200).json({
//             data: result
//         });
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

module.exports.vendorsData = async (req, res) => {
    try {
        const sql = `
        SELECT p.gateway_name, FORMAT(SUM(t.ammount), 2) AS totalAmount
        FROM tbl_merchant_transaction t
        JOIN payment_gateway p ON t.gatewayNumber = p.id
        WHERE t.created_on >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND t.status=1
        GROUP BY t.gatewayNumber, p.id, p.gateway_name
        ORDER BY SUM(t.ammount) DESC
        LIMIT 10;
        `;

        // Execute the SQL query
        const result = await mysqlcon(sql);

        if (result.length === 1) {
            const topRecord = result[0];
            const remainingLimit = 9;
            const remainingSql = `
            SELECT p.gateway_name, FORMAT(SUM(t.ammount), 2) AS TotalAmount
            FROM tbl_merchant_transaction t
            JOIN payment_gateway p ON t.gatewayNumber = p.id
            WHERE t.created_on >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND status=1
            AND t.gatewayNumber != ?
            GROUP BY t.gatewayNumber, p.id, p.gateway_name
            ORDER BY RAND()
            LIMIT ?;
            `;
            // Execute the SQL query to get 9 random records
            const remainingResult = await mysqlcon(remainingSql, [topRecord.merchantGatewayNumber, remainingLimit]);

            // Combine top record and remaining random records
            const finalResult = [topRecord, ...remainingResult];

            // Send the response with the data
            res.status(200).json({
                data: finalResult.map(item => ({ Vendors: item.gateway_name, Amount: item.totalAmount }))
            });
        } else {
            // If there are multiple records in the top 10, send the response with the data directly
            res.status(200).json({
                data: result.map(item => ({ Vendors: item.gateway_name, Amount: item.totalAmount }))
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.getTypeDetails = async (req, res) => {
    try {
        // Database queries
        const sql1 = 'SELECT type FROM payout_gateway_detail';
        const sql2 = 'SELECT type FROM gateway_detail';

        // Execute both queries concurrently
        const [payoutGatewayResult, gatewayDetailsResult] = await Promise.all([
            mysqlcon(sql1),
            mysqlcon(sql2)
        ]);

        // Send the response
        res.status(200).json({ payout_gateway: payoutGatewayResult, gateway_details: gatewayDetailsResult });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}











