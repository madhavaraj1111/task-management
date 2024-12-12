import express from "express";
import {
  TaskCreate,
  TaskDelete,
  TaskRead,
  TaskUpdate,
} from "../controller/task.controller.js";

const router = express.Router();

router.get("/", TaskRead);

router.post("/", TaskCreate);

router.delete("/:id", TaskDelete);

router.put("/:id", TaskUpdate);

export default router;
