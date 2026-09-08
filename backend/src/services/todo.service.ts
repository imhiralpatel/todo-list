import sql from "mssql";
import { getDB } from "../config/db";
import { CreateTodoRequest } from "../types/todo.types";

export const createTodo = async (data: CreateTodoRequest) => {
    const db = getDB();

    const result = await db
        .request()
        .input("Title", sql.NVarChar(200), data.title)
        .input(
            "Description",
            sql.NVarChar(1000),
            data.description || null
        )
        .query(`
      INSERT INTO tblTodos (Title, Description)
      OUTPUT
        INSERTED.Id,
        INSERTED.Title,
        INSERTED.Description,
        INSERTED.IsCompleted,
        INSERTED.CreatedAt,
        INSERTED.UpdatedAt
      VALUES (@Title, @Description)
    `);

    return result.recordset[0];
};

// GET ALL TODOS
export const getTodos = async () => {
  const db = getDB();

  const result = await db
    .request()
    .query(`
      SELECT
        Id,
        Title,
        Description,
        IsCompleted,
        CreatedAt,
        UpdatedAt
      FROM tblTodos
      ORDER BY Id DESC
    `);

  return result.recordset;
};
