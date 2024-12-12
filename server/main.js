import express from "express";
import connectDb from "./lib/db.js";
import taskRoutes from "./router/task.router.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 4545;
connectDb();

app.use(express.json());
app.use(cors());
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`The server is running in the port ${PORT}`);
});
