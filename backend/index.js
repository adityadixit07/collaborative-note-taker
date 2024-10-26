import express from "express";
import cors from "cors";
import { ConnectDB } from "./config/dbConnect.js";
import router from "./routes/Notes.js";
import authenticateUser from "./middleware/authMiddleware.js";
import userRoutes from "./routes/User.js";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(morgan("dev"));

// db connect
ConnectDB();

// routes
app.use("/user", userRoutes);
app.use("/notes", authenticateUser, router);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
