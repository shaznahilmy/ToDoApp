"use strict"
const ToDoTask = require("../models/TodoTask.js");

const createTask = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).send({ error: "Content is required" });
        }

        await ToDoTask.create({ content });
        res.redirect("/"); // Redirect to the main page after task is created
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const getAllTasks = async (req,res) => {
    try{
        const tasks = await ToDoTask.find().exec();
        res.render('todo.ejs', { tasks });
    }
    catch(error){
        console.log(error)
        return res.status(500).send;
    }
};

const deleteTask = async (req,res) => {
    try {
        const { id } = req.params;
        console.log(`Attempting to delete task with ID: ${id}`); // Debug line
        const task = await ToDoTask.findByIdAndDelete(id).exec();
        if (!task) {
            console.log('Task not found');
            return res.status(404).send({ error: 'Task not found' });
        }
        res.redirect("/"); // Redirect to the main page after task is deleted
    } catch (error) {
        console.log('Error deleting task:', error);
        return res.status(500).send();
    }
};

const editTask = async (req,res) =>{
    try {
        const { id } = req.params;
        const { content } = req.body;
        console.log(`Attempting to edit task with ID: ${id}, new content: ${content}`); // Debug line
        const task = await ToDoTask.findByIdAndUpdate(id, { content }, { new: true }).exec();
        if (!task) {
            console.log('Task not found');
            return res.status(404).send({ error: 'Task not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.log('Error updating task:', error);
        return res.status(500).send();
    }

    
};

module.exports = { createTask, getAllTasks, deleteTask, editTask};
    
