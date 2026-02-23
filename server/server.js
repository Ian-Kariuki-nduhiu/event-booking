import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";
import authRouter from "./router/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

await connectDB();

app.use("/api/auth", authRouter);
app.get("/", (req, res) => res.send("Hi there"));

app.listen(process.env.PORT || 8000, () => {
  console.log(`server running at port: ${process.env.PORT}`);
});
