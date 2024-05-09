

const Task = require("../models/task");

async function getAllTasks(req,res){
    try {
        const task = await Task.find({});
        res.status(200).json({task});
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

async function createTask(req,res){
    try {
      const task = await Task.create(req.body);
      res.status(201).json({task});
    } catch (err) {
      res.status(500).json({ msg: err });
    }
    
};

function getTask(req,res) {
    res.json({id:req.params.id});
};

function updateTask(req,res) {
    res.send("update task");
};

function deleteTask(req,res) {
    res.send("delete task");
};

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};