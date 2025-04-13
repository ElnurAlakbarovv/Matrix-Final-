import express from "express";

import {
  addProduct,
  deleteProduct,
  getProducts,
  pagenation,
  searchProduct,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../upload/upload.js";

const productRouter = express.Router();

productRouter.post("/", upload.single("image"), addProduct);
productRouter.get("/", getProducts);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/search/:title", searchProduct);
productRouter.put("/update/:id", upload.single("image"), updateProduct);
productRouter.get("/pagination", pagenation);

export default productRouter;
