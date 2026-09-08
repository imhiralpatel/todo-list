import { Request, Response } from "express";
import { createTodo, getTodos } from "../services/todo.service";

export const createTodoController = async (
    req: Request,
    res: Response
) => {
    try {
        const { title, description } = req.body;

        if (!title || typeof title !== "string") {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const todo = await createTodo({
            title,
            description
        });

        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: todo
        });
    }
    catch (error) {
        console.error("CREATE TODO ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        });

    }
};

// GET ALL TODOS
export const getTodosController = async (
  req: Request,
  res: Response
) => {
  try {
    const todos = await getTodos();

    return res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    console.error("GET TODOS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
