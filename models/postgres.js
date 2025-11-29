const { Client } = require("pg");

exports.dbConnection = async (sql, values) => {
  return new Promise(async (resolve, reject) => {
    const client = new Client({
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      port: process.env.PG_PORT,
    });
 
    try {
      await client.connect();
      console.log("Connected to PostgreSQL!");

      const result = await client.query(sql, values);

      await client.end();

      resolve({ err: null, result: result.rows });
    } catch (err) {
      console.log("PostgreSQL Error:", err);

      resolve({
        err,
        errMessage: "PostgreSQL Query Failure",
        result: null,
      });
    }
  });
};
