import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { collection: "Blogs", timestamps: true }
);

const Blog = mongoose.model("Blogs", productSchema);

export default Blog;
