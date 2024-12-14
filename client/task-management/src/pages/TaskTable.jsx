import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

const TaskTable = () => {
  const [taskData, setTaskData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewID, setViewID] = useState();
  const navigate = useNavigate();

  const fetchTasks = () => {
    axios
      .get("http://localhost:4545/tasks/")
      .then((response) => {
        setTaskData(response.data);
      })
      .catch((error) => {
        console.log("Error while getting data from the server", error);
      });
  };

  const handleView = (id) => {
    setViewID(id);
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4545/tasks/${id}`);
    } catch (error) {
      console.log("Error when deleting the data", error);
    }
  };

  const handleEdit = (id) => {
    navigate("/edit-task", { state: id });
  };

  const viewData = taskData.find((task) => {
    return task._id == viewID;
  });

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleToggle = async (toggleId, checked) => {
    try {
      const currentValue = !checked;
      await axios.put(`http://localhost:4545/tasks/${toggleId}`, {
        checked: currentValue,
      });
      fetchTasks();
    } catch (error) {
      console.log("Error when update toggle data", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="mx-10 mt-10 flex items-center justify-center">
      {isModalOpen ? (
        <div
          className={`absolute z-10 mx-auto max-w-md rounded-lg border-2 border-gray-200 bg-white px-20 py-8 text-xs shadow-inner shadow-gray-500 transition-all duration-300`}
        >
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Task Details
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Task Name:</h3>
              <p className="text-sm text-gray-600">{viewData.taskName}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Task Created At:
              </h3>
              <p className="text-sm text-gray-600">
                {dayjs(viewData.createdAt).format("DD-MM-YYYY,HH:MM")}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Expected Finishing Time:
              </h3>
              <p className="text-sm text-gray-600">
                {dayjs(viewData.finishingTime).format("DD-MM-YYYY,HH:MM")}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-700">
                Task Status:
              </h3>
              {viewData.checked ? (
                <span className="inline-flex items-center rounded-full bg-green-200 px-3 py-1 text-sm font-medium text-green-800">
                  Completed
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-red-200 px-3 py-1 text-sm font-medium text-red-800">
                  Incomplete
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              className="rounded border border-transparent bg-blue-500 px-4 py-2 text-white hover:border hover:border-blue-500 hover:bg-white hover:text-blue-500 focus:outline-none focus:ring"
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="relative overflow-x-auto bg-gray-500 p-5 shadow-md sm:rounded-lg">
        <button
          className="mb-2 flex items-center rounded border-b-4 border-blue-700 bg-blue-500 px-2 py-1 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
          onClick={() => {
            navigate("/add-task");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="w-6"
          >
            <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
          </svg>{" "}
          Add Task
        </button>
        <div className="bg-slate-400 p-5 pb-4 dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block w-80 rounded-lg border border-gray-300 bg-gray-50 pb-2 ps-10 pt-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="dark:ring-offset-green-800-800 h-4 w-4 rounded border-green-300 bg-green-100 text-green-200 focus:ring-2 focus:ring-green-300 dark:border-green-600 dark:bg-green-700 dark:focus:ring-green-300 dark:focus:ring-offset-green-800"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                TaskName
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Task Created at
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Expected finishing time
              </th>
              <th className="px-6 py-3 text-center">Task status</th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {taskData.map((data) => {
              return (
                <tr
                  className="border-b bg-white transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-900"
                  key={data._id}
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        defaultChecked={data.checked}
                        onChange={() => {
                          handleToggle(data._id, data.checked);
                        }}
                        className={`h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800`}
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {data.taskName}
                  </th>
                  <td className="px-6 py-4">
                    {dayjs(data.createdAt).format("DD-MM-YYYY,HH:mm")}
                  </td>
                  <td className="px-6 py-4">
                    {dayjs(data.finishingTime).format("DD-MM-YYYY,HH:mm")}
                  </td>
                  <td className="px-6 py-4">
                    <label className="me-5 inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        value={data.checked}
                        className="peer sr-only"
                        defaultChecked={data.checked}
                        onChange={() => {
                          handleToggle(data._id, data.checked);
                        }}
                      />
                      <div className="peer relative h-6 w-11 rounded-full bg-red-500 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-gray-300 rtl:peer-checked:after:-translate-x-full"></div>
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {data.checked ? "Completed" : "Incomplete"}
                      </span>
                    </label>
                  </td>
                  <td className="m-3 grid gap-3 py-3 text-center lg:grid-cols-3">
                    <button
                      className="rounded border border-blue-400 bg-slate-800 px-2 py-1 font-semibold text-blue-400 transition-all hover:border hover:border-transparent hover:bg-blue-500 hover:text-white"
                      onClick={() => {
                        handleView(data._id);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="rounded border border-green-500 bg-slate-800 px-2 py-1 font-semibold text-green-500 transition-all hover:border hover:border-transparent hover:bg-green-500 hover:text-white"
                      onClick={() => {
                        handleEdit(data._id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded border border-red-400 bg-slate-800 px-2 py-1 font-semibold text-red-400 transition-all hover:border hover:border-transparent hover:bg-red-500 hover:text-white"
                      onClick={() => {
                        handleDelete(data._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
