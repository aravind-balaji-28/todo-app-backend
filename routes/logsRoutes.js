const express = require('express')
const router =express.Router()
const loginLogsInfo =require('../controllers/logsController')
router.get('/S_todoLogsHistory' ,loginLogsInfo.S_loginHistory)
router.get('/P_todoLogsHistory' ,loginLogsInfo.P_loginHistory)


module.exports =router