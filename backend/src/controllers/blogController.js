import Blog from "../models/blogModel.js";
export const addBlog = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const imageUrl = req.file
      ? `images/${req.file.filename}`.replace(/\\/g, "/")
      : "";

    const newBlog = new Blog({
      title,
      description,
      date,
      image: imageUrl,
    });

    await newBlog.save();
    return res.status(201).json(newBlog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchBlog = async (req, res) => {
  const { title } = req.params;
  try {
    const blogs = await Blog.find({
      title: { $regex: title, $options: "i" },
    });
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;

  try {
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    let imageUrl = existingBlog.image;
    if (req.file) {
      imageUrl = `images/${req.file.filename}`.replace(/\\/g, "/");
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description, date, image: imageUrl },
      { new: true }
    );

    return res.status(200).json(updatedBlog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
