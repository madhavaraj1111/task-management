import Task from "../model/task.model.js";

export const TaskRead = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const TaskDetail = async (req, res) => {
  try {
    const taskDetail = await Task.findOne({ _id: req.params.id });
    res.status(200).json(taskDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const TaskCreate = (req, res) => {
  try {
    const newTask = new Task({
      taskName: req.body.taskName,
      createdAt: req.body.createdAt,
      finishingTime: req.body.finishingTime,
      checked: req.body.checked,
    });
    newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const TaskDelete = async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id });
  } catch (error) {
    console.log("Error when deleting the data", error);
  }
};

export const TaskUpdate = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      {
        taskName: req.body.taskName,
        createdAt: req.body.createdAt,
        finishingTime: req.body.finishingTime,
        checked: req.body.checked,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedTask);
    console.log("Data updated successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
