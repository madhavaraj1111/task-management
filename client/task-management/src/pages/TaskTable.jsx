import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

const TaskTable = () => {
  const [taskData, setTaskData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [viewID, setViewID] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4545/tasks/")
      .then((response) => {
        setTaskData(response.data);
      })
      .catch((error) => {
        console.log("Error while getting data from the server", error);
      });
  }, []);

  // view functionality
  const handleView = (id) => {
    setViewID(id);
    setIsModalOpen(!isModalOpen);
  };

  const viewData = taskData.find((task) => {
    return task._id == viewID;
  });

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mx-10 mt-40 flex justify-center items-center">
      {isModalOpen ? (
        <div
          className={`max-w-md bg-white rounded-lg shadow-2xl px-20 py-8 absolute mx-auto z-10  text-xs border transition-all duration-300 `}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Task Details
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Task Name:</h3>
              <p className="text-gray-600 text-sm">{viewData.taskName}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Task Created At:
              </h3>
              <p className="text-gray-600 text-sm">{viewData.createdAt}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Expected Finishing Time:
              </h3>
              <p className="text-gray-600 text-sm">{viewData.finishingTime}</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-700 ">
                Task Status:
              </h3>
              {viewData.checked ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-200 text-green-800">
                  Completed
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-200 text-red-800">
                  Incomplete
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:border hover:border-blue-500 hover:bg-white border-transparent border hover:text-blue-500 focus:outline-none focus:ring"
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 flex items-center hover:border-blue-500 rounded mb-2"
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
        <div className="pb-4  dark:bg-gray-900 p-5 bg-slate-400 ">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none ">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
              className="block pt-2 pb-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-green-200 bg-green-100 border-green-300 rounded focus:ring-green-300 dark:focus:ring-green-300 dark:ring-offset-green-800-800 dark:focus:ring-offset-green-800 focus:ring-2 dark:bg-green-700 dark:border-green-600"
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
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition-all hover:bg-gray-50 dark:hover:bg-gray-900 "
                  key={data._id}
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        defaultChecked={data.checked}
                        onClick={() => {
                          setCheckBox(!checkBox);
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
                    {data.checked ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-200 text-green-800">
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-200 text-red-800">
                        Incomplete
                      </span>
                    )}
                  </td>
                  <td className="py-3 grid lg:grid-cols-3  text-center gap-3 m-3">
                    <button
                      className="hover:bg-blue-500 text-blue-400 hover:border border-blue-400 border hover:border-transparent  px-2 py-1 transition-all rounded hover:text-white bg-slate-800 font-semibold"
                      onClick={() => {
                        handleView(data._id);
                      }}
                    >
                      View
                    </button>
                    <button className="hover:bg-green-500 text-green-500 font-semibold bg-slate-800  px-2 py-1 transition-all hover:border border-green-500 hover:text-white rounded border hover:border-transparent">
                      Edit
                    </button>
                    <button className="hover:bg-red-500 hover:border border-red-400 border hover:border-transparent font-semibold bg-slate-800 px-2 py-1 transition-all text-red-400 hover:text-white rounded">
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
