import express from "express";
import {
  TaskCreate,
  TaskDelete,
  TaskDetail,
  TaskRead,
  TaskUpdate,
} from "../controller/task.controller.js";

const router = express.Router();

router.get("/", TaskRead);

router.get("/:id", TaskDetail);

router.post("/", TaskCreate);

router.delete("/:id", TaskDelete);

router.put("/:id", TaskUpdate);

export default router;
