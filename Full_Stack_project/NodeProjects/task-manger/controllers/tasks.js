

function getAllTasks(req,res){
    res.send("get all tasks");
};

function createTask(req,res){
    res.json(req.body);
};

function getTask(req,res) {
    res.json({id:req.params.id});
}

function updateTask(req,res) {
    res.send("update task");
}

function deleteTask(req,res) {
    res.send("delete task");
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}