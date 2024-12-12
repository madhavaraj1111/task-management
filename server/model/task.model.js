import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  taskName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  finishingTime: { type: Date, default: Date.now, required: true },
  checked: { type: Boolean, required: true },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
