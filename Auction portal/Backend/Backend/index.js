const http = require('http');
const express = require('express');
//require('./config/global');
const bodyParser = require('body-parser');
const approutes = require('./Routes');

var cors = require('cors');
//var mailer = require('express-mailer');
const port = '9091';
const app = express();
const path = require('path');
const server = http.createServer(app);

//app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

approutes(app); 
server.listen(port, () => {
	console.log(`Server running at ${port}`);
});
