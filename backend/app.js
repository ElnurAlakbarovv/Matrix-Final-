import express from "express";
import cors from "cors";
import "dotenv/config";
import "./src/db/dbConnection.js";
import productRouter from "./src/routes/productRouter.js";
import userRouter from "./src/routes/userRouter.js";
import cookieParser from "cookie-parser";
import blogRouter from "./src/routes/blogRouter.js";

const port = process.env.PORT || 5001;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.UI_LINK,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/products", productRouter);
app.use("/api/blog", blogRouter);
app.use("/auth", userRouter);
app.use("/images", express.static("src/images"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
