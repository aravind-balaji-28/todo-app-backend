const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController.js')

router.post('/createTask', taskController.createTask);
router.put('/updateTask/:id', taskController.updateTask);
router.delete('/deleteTask/:id', taskController.deleteTask);
router.delete('/deleteAllTask', taskController.deleteAllTask);
router.get('/getTaskList', taskController.getTaskList);

module.exports = router;
