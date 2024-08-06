const express = require("express");
const { createTask, deleteTask, getAllTasks ,editTask} = require("../controller/taskController");

const taskRouter = express.Router();
taskRouter.route("/")
    .get(getAllTasks).post(createTask);

taskRouter.route("/:id").delete(deleteTask).patch(editTask);


module.exports = taskRouter;