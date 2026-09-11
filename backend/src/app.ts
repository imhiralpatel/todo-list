import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db';
import todoRoutes from "./routes/todo.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.get("/", (req, resp)=>{
    resp.send("Todo Api is running")
})

app.use("/api/todos", todoRoutes);
app.use(
  "/api/auth",
  authRoutes
);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server");
    process.exit(1);
  }
};

startServer();