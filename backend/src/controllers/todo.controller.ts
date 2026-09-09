import { Request, Response } from "express";
import { createTodo, deleteAllTodos, deleteTodo, getTodoById, getTodos, updateTodo } from "../services/todo.service";
import { UpdateTodoRequest } from "../types/todo.types";

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

// Get Single Record
export const getTodoByIdController = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid todo id"
      });
    }

    const todo = await getTodoById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: todo
    });

  } catch (error) {

    console.error(
      "GET SINGLE TODO ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Update Todo
export const updateTodoController = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid todo id"
      });
    }

    const data: UpdateTodoRequest = req.body;

    const todo = await updateTodo(
      id,
      data
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo
    });

  } catch (error) {

    console.error(
      "UPDATE TODO ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Delete Single Todo
export const deleteTodoController = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid todo id"
      });
    }

    const deleted = await deleteTodo(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Todo not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully"
    });

  } catch (error) {

    console.error(
      "DELETE TODO ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Delete ALL Todo
export const deleteAllTodosController = async (
  req: Request,
  res: Response
) => {

  try {

    const deletedCount =
      await deleteAllTodos();

    return res.status(200).json({
      success: true,
      message: "All todos deleted successfully",
      deletedCount
    });

  } catch (error) {

    console.error(
      "DELETE ALL TODOS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};



