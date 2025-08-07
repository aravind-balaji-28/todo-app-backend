var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.json({ status: true, version: 3 })
});

module.exports = router;
   