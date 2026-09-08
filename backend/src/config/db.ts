import sql from 'mssql';
import dotenv from "dotenv";

dotenv.config();

const dbConfig: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || "localhost",
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT) || 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

let pool: sql.ConnectionPool;

export const connectDB = async (): Promise<sql.ConnectionPool> => {
  try {
    pool = await sql.connect(dbConfig);

    // console.log("SQL Server connected successfully");

    return pool;
  } catch (error) {
    // console.error("Database connection failed:", error);
    throw error;
  }
};

export const getDB = (): sql.ConnectionPool => {
  if (!pool) {
    throw new Error("Database is not connected");
  }

  return pool;
};
