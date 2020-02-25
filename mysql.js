//
// https://www.a2hosting.com/kb/developer-corner/mysql/connecting-to-mysql-using-node-js#Installing-the-node-mysql-package-npm
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
SQLconn.query('SELECT value, status, ts from DistanceData order by ts DESC LIMIT 50', function (err, rows, fields) {
    if (!err)  {
        console.log('Data received from Db:');
        console.log(fields);
      }
    else     
        console.log('Error while performing Query.');
  });
  SQLconn.end();