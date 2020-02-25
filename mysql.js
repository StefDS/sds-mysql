///
/// Stef's NodeJS Webserver for Docker & Kubernetes experiments
///
var myip = require('ip');
var myos = require('os');
var http = require('http');
var RetRecords = [];
const hostname = '0.0.0.0';
// const port = 8088;
const port = 4000;
//
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
    host: '192.168.2.2',
    user: 'user',
    password: 'HPE!nvent',
    database: 'sample'
  });
  SQLconn.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });  
  SQLconn.query('SELECT value, status, ts from DistanceData order by ts DESC LIMIT 10', function (err, rows) {
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

server.listen(port, hostname, () => {
  console.log("Server " + hostname.toString() + " listing on port " + port.toString() );
});

var callback = function (err, data) {
  if (err) return console.error(err);
  console.log(data);
};
