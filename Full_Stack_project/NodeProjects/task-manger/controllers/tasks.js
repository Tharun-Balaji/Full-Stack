const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const {createCustomAPIError} = require("../errors/custom-error");
const getAllTasks = asyncWrapper(async function(req, res){
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async function (req, res) {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

async function getTask(req, res, next) {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      return next(createCustomAPIError(`No task with id ${taskID}`, 404));
    }

    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
}

const updateTask = asyncWrapper(async function (req, res) {
  // res.send("update task");

  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomAPIError(`No task with id ${taskID}`, 404));
  }

  res.status(200).json({ task });

});

const deleteTask = asyncWrapper(async function (req, res) {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomAPIError(`No task with id ${taskID}`, 404));
  };
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
