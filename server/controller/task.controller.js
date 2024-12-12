import mongoose from "mongoose";
import Task from "../model/task.model.js";

export const TaskRead = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ message: error.message });
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

    res.status(201).json(newTask);
    newTask.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const TaskDelete = () => {};
export const TaskUpdate = () => {};
