///
/// Stef's NodeJS Webserver for Docker & Kubernetes experiments
///
var myip = require('ip');
var myos = require('os');
var http = require('http');
const hostname = '0.0.0.0';
// const port = 8088;
//const hostname = '127.0.0.1';
const port = 4000;
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
//
// Define Webserver hookup
//
const server = http.createServer((req, res) => {
  /* 
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("<b>** Sample NodeJS Web Application **</b><br>");
  res.write("<b>**   MySQL In Action -- 2020  **</b><br><br>");
  res.write("      Node Name: " + myos.hostname +  "<br>");
  res.write("   Node Address: " + myip.address() + " port: "+ server.address().port + "<br>");
  res.write("    Time is now: " + Date().toString()+ "<br>");
  /*
  Define SQL Statement
  */
  var urldata = req.url;   
  if (urldata == "/exit") { 
    res.write("*** webserver stopped ***<br>");
    console.log("*** webserver stopped ***");
    res.end(); 
    process.exit();
  }
  SQLconn.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });  
  SQLconn.query('SELECT value, status, ts from DistanceData order by ts DESC LIMIT 50', function (err, rows) {
    if (!err)  {
        console.log('Data received from Db:');
        // console.log(rows);
        //  res.write("URL data: " + urldata);
        //
        // Loop SQL records received
        //
        res.write(rows.toString);
        res.end();   
    }
    else {     
        res.write("*** No RECORDS RECEIVED ***<br>");
        console.log('Error while performing Query.');
      }
  });
});

server.listen(port, hostname, () => {
  console.log("Server " + hostname.toString() + " listing on port " + port.toString() );
});

var callback = function (err, data) {
  if (err) return console.error(err);
  console.log(data);
};
