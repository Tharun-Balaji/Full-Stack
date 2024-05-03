

function getAllTasks(req,res){
    res.send("get all tasks");
};

function createTask(req,res){
    res.send("Create task");
};

function getTask(req,res) {
    res.send("get single tasks");
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