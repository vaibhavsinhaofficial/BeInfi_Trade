const mysqlcon = require("../config/db_connection");
let today = new Date(); 
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time; 


module.exports.help_defaults=async(req,res)=>{
    let user_id = req.user.id
    var sql="SELECT id, date, ticket_for, ticket, status FROM merchant_ticket WHERE user_id = ?"
    var result = await mysqlcon(sql, [user_id]);
    return res.send({
        result : result
    })
}

module.exports.generateTicket=async(req,res)=>{
    const {ticket_for,description} = req.body;
    let user =  req.user.id
    console.log(user)
    var now=new Date();
    function getRandom(length) {
        return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
    }
    var details1={
        user_id: user,
        ticket:"AKNTO-TCKT-"+getRandom(9),
        ticket_for: ticket_for,
        date: now,
        assign_to: 1,
        status: 0,
        creation_date: now,
        modification_date: now
    }
    var sql="INSERT INTO merchant_ticket SET ?"
    var result1=await mysqlcon(sql,[details1]);
    console.log(details1.ticket)
    const sql1="SELECT id FROM merchant_ticket WHERE ticket=?"
    var result2=await mysqlcon(sql1,[details1.ticket])
    const id=result2[0].id;
    const details={
        request_from:2,
        user_id:user,
        ticket_id:id,
        description,
        images:req.file.originalname,
        status:0,
        creation_date: now,
        modification_date: now
    }
    var sql="INSERT INTO merchant_ticket_info SET ?"
    var result=await mysqlcon(sql,[details]);
    return res.send({
        res:result1,
        res2:result
    })
}

module.exports.UploadImage = async(req,res)=> {
    try{
        detail = {
            images : req.file.originalname,
        }
        sql = "INSERT INTO merchant_ticket_info SET ?"
        result = await mysqlcon(sql,[detail])
        if(!result){
            return res.json(200,{
                message : 'error occured'
            })
        }else{
            return res.json(201,{
                message : 'successul'
            })
        }
    }catch(error){
        console.log(error)
        return res.json(500,{
            message : 'error'
        })
    }
}

module.exports.help_view=async(req,res)=>{
    try {
        const {id} = req.body;
        var sql1 = "SELECT id, user_id, DATE_FORMAT(date,'%d %M,%Y') AS date,ticket_for,ticket,status FROM merchant_ticket WHERE id=?";
        var result1 = await mysqlcon(sql1, [id]);
        const check = result1[0].user_id
        let message;
        if(check === req.user.id){
            message = "You"
        } else {
            message = "Admin"
        }
        var sql2 = "SELECT images,description, DATE_FORMAT(creation_date,'%d %M,%Y') AS date FROM merchant_ticket_info WHERE ticket_id=?";
        var result2 = await mysqlcon(sql2, [id]);
        return res.json(200, { result1: result1, result2 : result2, message });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
}