import { Router } from "express";
import { createTodoController, deleteAllTodosController, deleteTodoController, getTodoByIdController, getTodosController, updateTodoController } from "../controllers/todo.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// POST /api/todos
router.post("/", authMiddleware, createTodoController);

// GET /api/todos
router.get("/", authMiddleware, getTodosController);


// SELECT SINGLE
router.get("/:id", getTodoByIdController);


// UPDATE
router.put("/:id", updateTodoController);


// DELETE ALL
router.delete("/", deleteAllTodosController);


// DELETE SINGLE
router.delete("/:id", deleteTodoController);



export default router;
