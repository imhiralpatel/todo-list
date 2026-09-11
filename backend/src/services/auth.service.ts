import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sql from 'mssql';
import { getDB } from "../config/db";
import {
  SignupRequest,
  LoginRequest,
  AuthResponse,
} from "../types/auth.types";

export const signupService = async (
  data: SignupRequest
): Promise<AuthResponse> => {
  const { name, email, password } = data;

  const pool = getDB();

  // Check existing user
  const existingUser = await pool
    .request()
    .input("email", sql.NVarChar(255), email)
    .query(`
      SELECT Id
      FROM tblUsers
      WHERE Email = @email
    `);

  if (existingUser.recordset.length > 0) {
    throw new Error("Email already registered");
  }

  // Password hash
  const passwordHash = await bcrypt.hash(password, 12);

  // Insert user
  const result = await pool
    .request()
    .input("name", sql.NVarChar(100), name)
    .input("email", sql.NVarChar(255), email)
    .input("passwordHash", sql.NVarChar(255), passwordHash)
    .query(`
      INSERT INTO tblUsers
      (
        Name,
        Email,
        PasswordHash
      )
      OUTPUT
        INSERTED.Id,
        INSERTED.Name,
        INSERTED.Email,
        INSERTED.CreatedAt
      VALUES
      (
        @name,
        @email,
        @passwordHash
      )
    `);

  const user = result.recordset[0];

  const token = generateToken(
    user.Id,
    user.Email
  );

  return {
    user: {
      id: user.Id,
      name: user.Name,
      email: user.Email,
      createdAt: user.CreatedAt,
    },
    token,
  };
};


export const loginService = async (
  data: LoginRequest
): Promise<AuthResponse> => {
  const { email, password } = data;

  const pool = getDB();

  // Find user
  const result = await pool
    .request()
    .input("email", sql.NVarChar(255), email)
    .query(`
      SELECT
        Id,
        Name,
        Email,
        PasswordHash,
        CreatedAt
      FROM tblUsers
      WHERE Email = @email
    `);

  if (result.recordset.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = result.recordset[0];

  // Compare password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.PasswordHash
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const token = generateToken(
    user.Id,
    user.Email
  );

  return {
    user: {
      id: user.Id,
      name: user.Name,
      email: user.Email,
      createdAt: user.CreatedAt,
    },
    token,
  };
};


const generateToken = (
  userId: number,
  email: string
): string => {
  return jwt.sign(
    {
      userId,
      email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};
