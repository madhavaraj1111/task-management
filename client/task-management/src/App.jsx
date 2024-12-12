import React from "react";
import TaskTable from "./pages/TaskTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTask from "./pages/AddTask";
import Layout from "./components/layout/Layout";
import EditTask from "./pages/EditTask";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {" "}
            <Route index element={<TaskTable />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/edit-task" element={<EditTask />} />
          </Route>
        </Routes>
      </BrowserRouter>{" "}
    </>
  );
};

export default App;
