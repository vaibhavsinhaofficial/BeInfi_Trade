const express = require('express');
const app = express();
const path = require('path');
const port = 9240;
const config = require('./config/config.js');
const cors = require("cors");
const settelmentRoute = require('./route/settelmentRoute')
// Cors error
app.use(cors({origin:["http://localhost:3000", "http://localhost:3001"]}));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../../client/public')));

// routing
app.use(require('./route/route'));
app.use(require('./routeMerchant/route'));
app.use(require('./routerBank/payroute'))
app.use(settelmentRoute)

// run website
app.listen(port, (req, res) =>{
    console.log('http://' + config.DB_HOST + ':' + port);
});


