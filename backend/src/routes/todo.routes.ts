import { Router } from "express";
import { createTodoController, getTodosController } from "../controllers/todo.controller";

const router = Router();

// POST /api/todos
router.post("/", createTodoController);

// GET /api/todos
router.get("/", getTodosController);

export default router;
