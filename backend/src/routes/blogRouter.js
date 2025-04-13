import express from "express";
import {
  addBlog,
  deleteBlog,
  getBlogs,
  searchBlog,
  updateBlog,
} from "../controllers/blogController.js";
import upload from "../upload/upload.js";

const blogRouter = express.Router();
blogRouter.post("/", upload.single("image"), addBlog);
blogRouter.get("/", getBlogs);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/search/:title", searchBlog);
blogRouter.put("/update/:id", upload.single("image"), updateBlog);

export default blogRouter;
