import React from "react";
import TaskTable from "./pages/TaskTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTask from "./pages/AddTask";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskTable />}></Route>
          <Route path="/add-task" element={<AddTask />}></Route>
        </Routes>
      </BrowserRouter>{" "}
    </>
  );
};

export default App;
