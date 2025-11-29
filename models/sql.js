const mysql = require("mysql");

exports.dbConnection = async (sql, values) => {
  return new Promise((resolve, reject) => {
    const client = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    client.connect((err) => {
      if (err) {
        console.log(err, "Err 1");
        resolve({ err,errMessage:"DB Connected Failure", result: null });
      }
      console.log("Connected to Mysql");

      client.query(sql, values, (err, result) => {
        client.end();
        if (err) {
          console.log(err, "Err 2");
          resolve({ err, errMessage:"Query Failure",result: null });
        } else {
          resolve({ err: null, result: result });
        }
      });
    });
  });
};
