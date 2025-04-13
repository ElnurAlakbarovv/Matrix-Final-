import product from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const { title, category, price, description } = req.body;
    const imageUrl = `images/${req.file.filename}`.replace(/\\/g, "/");

    const newProduct = new product({
      title,
      category,
      price,
      description,
      image: imageUrl,
    });

    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await product.find();
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const pagenation = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const startIndex = (page - 1) * limit;
    const total = await product.countDocuments({});

    const products = await product.find().skip(startIndex).limit(limit);
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    return res
      .status(200)
      .json({ products, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedproduct = await product.findByIdAndDelete(id);
    if (!deletedproduct) {
      return res.status(404).json({ message: "No product found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchProduct = async (req, res) => {
  const { title } = req.params;
  try {
    const products = await product.find({
      title: { $regex: title, $options: "i" },
    });
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, category, price, description } = req.body;
  try {
    const existingProduct = await product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imageUrl = existingProduct.image;
    if (req.file) {
      imageUrl = `images/${req.file.filename}`.replace(/\\/g, "/");
    }

    const updatedProduct = await product.findByIdAndUpdate(
      id,
      { title, category, price, description, image: imageUrl },
      { new: true }
    );

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
