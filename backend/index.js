import express from "express";
import cors from "cors";
import { ConnectDB } from "./config/dbConnect.js";
import { login, register } from "./controllers/authController.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// db connect
ConnectDB();

// routes
app.post("/register", register);
app.post("/login", login);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
