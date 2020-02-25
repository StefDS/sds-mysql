///
/// Stef's NodeJS Webserver for Docker & Kubernetes experiments
///
var myip = require('ip');
var myos = require('os');
var http = require('http');
var RetRecords = [];
//
// read Config file
//
var config = require('config');
let WEBhost = config.get('web.host');
let WEBport = config.get('web.port');
let SQLhost = config.get('sql.host');
let SQLuser = config.get('sql.user');
let SQLpassword = config.get('sql.password');
let SQLport = config.get('sql.port');
let SQLDatabase = config.get('sql.database');
let SQLquery =  config.get('sql.query');
/*
const hostname = '0.0.0.0';
const port = 4000;
*/
// Define Webserver hookup
//
const server = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("<b>** Sample NodeJS Web Application **</b><br>");
  res.write("<b>**    MySQL In Action -- 2020    **</b><br><br>");
  res.write("      Node Name: " + myos.hostname +  "<br>");
  res.write("   Node Address: " + myip.address() + " port: "+ server.address().port + "<br>");
  res.write("    Time is now: " + Date().toString()+ "<br><br>");
  var urldata = req.url;   
  if (urldata == "/exit") { 
    res.write("*** webserver stopped ***<br>");
    console.log("*** webserver stopped ***");
    res.end(); 
    process.exit();
  }
  //
  // MySQL hookup
  //
  const mysql = require('mysql');
  const SQLconn = mysql.createConnection({
    host: SQLhost,
    user: SQLuser,
    port: SQLport,
    password: SQLpassword,
    database: SQLDatabase
  });
  SQLconn.connect((err) => {
    if(err){
      res.write("<b>*!!* ERROR connecting to Database  on host: " + SQLhost + " *!!*</b><br>");
      res.end();
      console.log('Error connecting to Database on host: ' + SQLhost);
      //process.exit();
      return;
    }
    console.log('Connection established');
    SQLconn.query(SQLquery, function (err, rows) {
        if (!err)  {
          RetRecords= JSON.stringify(rows);
        }
        else {     
          res.write("*** No RECORDS RECEIVED ***<br>");
          console.log('Error while performing Query.');
        }
    });
    res.write("*** JSON Query of last 10 records ***<br>");
    res.write(RetRecords + "<br>");
    console.log('=========');
    console.log(RetRecords);
    res.end();   
  });  
});

server.listen(WEBport, WEBhost, () => {
  console.log("Server " + WEBhost.toString() + " listing on port " + WEBport.toString() );
});

var callback = function (err, data) {
  if (err) return console.error(err);
  console.log(data);
};
