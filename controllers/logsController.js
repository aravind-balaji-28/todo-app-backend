const db = require("../models/sql");
const dbP = require("../models/postgres");
const moment = require("moment");
exports.S_loginHistory = async (req, res) => {
  try {
    const start = moment(); // start time
    const limit = 100;
    let query = `SELECT * FROM todo_logs LEFT JOIN todo_level ON todo_logs.id = todo_level.id LIMIT ${limit}`;
    let response = await db.dbConnection(query);
    const updateLevelAmountQuery = `UPDATE todo_level SET amount = '123456789.12' WHERE todo_level.id = 2;`;
    let responseUpdate = await db.dbConnection(updateLevelAmountQuery);
    console.log(responseUpdate, "responseUpdate");
    const end = moment();

    const diffMs = end.diff(start);

    const time = moment.utc(diffMs).format("HH:mm:ss.SSS");

    console.log({ limit, time });
    return res.json({
      status: true,
      result: response.result,
    });
  } catch (err) {
    return res.json({
      status: false,
      error: err.message,
    });
  }
};

exports.P_loginHistory = async (req, res) => {
  try {
    const start = moment(); // start time

    const limit = 100;
    let query = `SELECT * FROM todo_logs LEFT JOIN todo_level ON todo_logs.id = todo_level.id LIMIT ${limit}`;
    let response = await dbP.dbConnection(query);
       const updateLevelAmountQuery = `UPDATE todo_level SET amount = '123456789.12' WHERE todo_level.id = 2;`;
    let responseUpdate = await dbP.dbConnection(updateLevelAmountQuery);
    console.log(responseUpdate, "responseUpdate");
    const end = moment();

    const diffMs = end.diff(start);

    const time = moment.utc(diffMs).format("HH:mm:ss.SSS");

    console.log({ limit, time });

    return res.json({
      status: true,
      result: response.result,
    });
  } catch (err) {
    return res.json({
      status: false,
      error: err.message,
    });
  }
};
