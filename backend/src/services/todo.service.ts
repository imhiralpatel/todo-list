import sql from "mssql";
import { getDB } from "../config/db";
import { CreateTodoRequest, UpdateTodoRequest } from "../types/todo.types";

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

// GET SINGLE TODO
export const getTodoById = async (
  id: number
) => {

  const db = getDB();

  const result = await db
    .request()
    .input(
      "Id",
      sql.Int,
      id
    )
    .query(`
      SELECT
        Id,
        Title,
        Description,
        IsCompleted,
        CreatedAt,
        UpdatedAt
      FROM tblTodos
      WHERE Id = @Id
    `);

  return result.recordset[0] || null;
};


// UPDATE TODO
export const updateTodo = async (
  id: number,
  data: UpdateTodoRequest
) => {

  const db = getDB();

  const result = await db
    .request()
    .input(
      "Id",
      sql.Int,
      id
    )
    .input(
      "Title",
      sql.NVarChar(200),
      data.title ?? null
    )
    .input(
      "Description",
      sql.NVarChar(1000),
      data.description ?? null
    )
    .input(
      "IsCompleted",
      sql.Bit,
      data.completed ?? null
    )
    .query(`
      UPDATE tblTodos
      SET
        Title = COALESCE(@Title, Title),
        Description = COALESCE(@Description, Description),
        IsCompleted = COALESCE(@IsCompleted, IsCompleted),
        UpdatedAt = GETDATE()
      OUTPUT
        INSERTED.Id,
        INSERTED.Title,
        INSERTED.Description,
        INSERTED.IsCompleted,
        INSERTED.CreatedAt,
        INSERTED.UpdatedAt
      WHERE Id = @Id
    `);

  return result.recordset[0] || null;
};


// DELETE SINGLE TODO
export const deleteTodo = async (
  id: number
) => {

  const db = getDB();

  const result = await db
    .request()
    .input(
      "Id",
      sql.Int,
      id
    )
    .query(`
      DELETE FROM tblTodos
      WHERE Id = @Id
    `);

  return result.rowsAffected[0] > 0;
};


// DELETE ALL TODOS
export const deleteAllTodos = async () => {

  const db = getDB();

  const result = await db
    .request()
    .query(`
      DELETE FROM tblTodos
    `);

  return result.rowsAffected[0];
};

