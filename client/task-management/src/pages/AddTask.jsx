import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const AddTask = () => {
  const navigate = useNavigate();
  const [newData, setNewData] = useState({
    taskName: "",
    createdAt: "",
    finishingTime: "",
    checked: "",
  });

  const handleAdd = () => {
    try {
      axios.post("http://localhost:4545/tasks/", newData);
      console.log("Task Added successfully");
      navigate("/");
    } catch (error) {
      console.log("Problem when adding the task", error);
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Add New Task
        </h2>
        <form>
          {/* Task Name */}
          <div className="mb-4">
            <label
              htmlFor="taskName"
              className="block text-sm font-medium text-gray-700"
            >
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter task name"
              onChange={(e) =>
                setNewData({ ...newData, taskName: e.target.value })
              }
              required
            />
          </div>

          {/* Task Created At */}
          <div className="mb-4">
            <label
              htmlFor="taskCreatedAt"
              className="block text-sm font-medium text-gray-700"
            >
              Task Created At
            </label>
            <input
              type="datetime-local"
              id="taskCreatedAt"
              name="taskCreatedAt"
              onChange={(e) =>
                setNewData({ ...newData, createdAt: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Expected Finishing Time */}
          <div className="mb-4">
            <label
              htmlFor="expectedFinishTime"
              className="block text-sm font-medium text-gray-700"
            >
              Expected Finishing Time
            </label>
            <input
              type="datetime-local"
              id="expectedFinishTime"
              name="expectedFinishTime"
              onChange={(e) =>
                setNewData({ ...newData, finishingTime: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Task Status */}
          <div className="mb-4">
            <label
              htmlFor="taskStatus"
              className="block text-sm font-medium text-gray-700"
            >
              Task Status
            </label>
            <select
              id="taskStatus"
              name="taskStatus"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  checked: e.target.value === "Completed",
                })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="--" className="text-center">
                --Select--
              </option>
              <option value="Incomplete">Incomplete</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={(e) => {
                e.preventDefault();
                handleAdd();
              }}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
