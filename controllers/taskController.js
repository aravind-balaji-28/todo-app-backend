const Task = require('../models/taskModels');
const { Validator } = require("node-input-validator");

exports.createTask = async (req, res) => {
    try {
        const validator = new Validator(req.body, {
            title: 'required|minLength:3|maxLength:100',
            isCompleted: 'required|boolean',
        });

        const isValid = await validator.check();

        let alreadyCheck = await Task.findOne({ title: req.body.title })
        if (alreadyCheck) {
            return res.status(400).json({ status: false, message: "Already title exit!" })
        }
        if (!isValid) {
            const errors = Object.keys(validator.errors).map(key => {
                return validator.errors[key].message;
            }).join(', ');
            console.error("Validation Errors:", errors);
            return res.status(400).json({
                status: false,
                message: errors,
            });
        }

        const task = new Task(req.body);
        const response = await task.save();
        return res.status(201).json({
            status: true,
            message: 'Task created successfully',
            data: response
        });
    } catch (error) {
        console.error("Catch Error creating task:", error);
        return res.status(500).json({
            status: false,
            message: 'Oops! Task creation failed. Please try again later.',
            error: error.message,
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ status: false, message: "Invalid Parameter" });
        }

        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({
                status: false,
                message: 'Task not found',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Task updated successfully',
            data: updatedTask,
        });
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({
            status: false,
            message: 'Oops! Task updation failed. Please try again later.',
            error: error.message,
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ status: false, message: "Invalid Parameter" });
        }
        const deleteTask = await Task.findByIdAndDelete(id);
        if (!deleteTask) {
            return res.status(404).json({
                status: false,
                message: 'Task not found',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Task deleted successfully',
            data: deleteTask,
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({
            status: false,
            message: 'Oops! Task deletion failed. Please try again later.',
            error: error.message,
        });
    }
};

exports.deleteAllTask = async (req, res) => {
    try {

        console.log("req.body: ", req.body);
        const ids = req.body.ids;
        if (!Array.isArray(ids) || !ids.length) {
            return res.status(400).json({ message: 'No task ids' });
        }
        let result = await Task.deleteMany({ _id: { $in: ids } });
        console.log("result: ", result);
        return res.status(200).json({
            status: true,
            message: 'Deleted all task successfully',
            data: ids
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({
            status: false,
            message: 'Oops! All task deletion failed. Please try again later.',
            error: error.message,
        });
    }
};


exports.getTaskList = async (req, res) => {
    try {
        const validator = new Validator(req.query, {
            page: 'required|integer',
            limit: 'required|integer',
            status: 'required',
            sortType: 'required|minLength:1|maxLength:5',
        });
        const isValid = await validator.check();
        if (!isValid) {
            const errors = Object.keys(validator.errors).map(key => {
                return validator.errors[key].message;
            }).join(', ');
            return res.status(400).json({
                status: false,
                message: errors,
            });
        }

        const pageNo = parseInt(req.query.page) || 1;
        console.log("req.query: ", req.query.sortType);
        const pageSize = parseInt(req.query.limit) || 5;
        const skip = (pageNo - 1) * pageSize;
        const status = req.query.status === "completed" ? { isCompleted: true } : req.query.status === "incompleted" ? { isCompleted: false } : {};
        console.log("status: ", status);
        const sortType = req.query.sortType === "asc" ? 1 :-1

        const [tasks, totalCount] = await Promise.all([
            Task.find(status).skip(skip).limit(pageSize).sort({ createdAt:  sortType }),
            Task.countDocuments(status),
        ]);

        return res.status(200).json({
            status: true,
            data: tasks,
            totalPages: Math.ceil(totalCount / pageSize),
            currentPage: pageNo,
            totalTasks: totalCount,
            message: "Fetch task list successfully"
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({
            status: false,
            message: 'Oops! Something went wrong while fetching tasks. Please try again later.',
            error: error.message,
        });
    }
};
