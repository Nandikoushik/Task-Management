import { Router } from "express";
import { getTaskList, getTaskDetails, updateTask, deleteTask ,addTask } from "./controller.js";

const router = Router();

// Public routes
router
    .get("/", getTaskList)
    .get("/details/:id", getTaskDetails)
    .put("/:id", updateTask)
    .delete("/:id", deleteTask)
    .post("/", addTask);


export default router;
