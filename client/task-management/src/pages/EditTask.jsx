import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import dayjs from "dayjs";

const EditTask = () => {
  const [newData, setNewData] = useState({
    taskName: "",
    createdAt: "",
    finishingTime: "",
    checked: "",
  });
  const location = useLocation();
  const id = location?.state;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4545/tasks/${id}`).then((response) => {
      setNewData(response.data);
    });
  }, []);

  const handleEdit = (data) => {
    try {
      axios.put(`http://localhost:4545/tasks/${id}`, data);
      navigate("/");
    } catch (error) {
      console.log("Error from frontend updation", error);
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-20 p-6 bg-gray-700  shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Edit Task
        </h2>
        <form className="space-y-8">
          {/* Task Name */}
          <div className="mb-4">
            <label
              htmlFor="taskName"
              className="block text-sm font-medium text-white"
            >
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter task name"
              value={newData?.taskName}
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
              className="block text-sm font-medium text-white"
            >
              Task Created At
            </label>
            <input
              type="datetime-local"
              id="taskCreatedAt"
              name="taskCreatedAt"
              value={dayjs(newData?.createdAt).format("YYYY-MM-DDTHH:mm")}
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
              className="block text-sm font-medium text-white"
            >
              Expected Finishing Time
            </label>
            <input
              type="datetime-local"
              id="expectedFinishTime"
              name="expectedFinishTime"
              value={dayjs(newData?.finishingTime).format("YYYY-MM-DDTHH:mm")}
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
              className="block text-sm font-medium text-white"
            >
              Task Status
            </label>
            <select
              id="taskStatus"
              name="taskStatus"
              value={newData?.checked ? "Completed" : "Incomplete"}
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
              className="w-full  bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={(e) => {
                e.preventDefault();
                handleEdit(newData);
              }}
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;