import express from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
  addToBasket,
  removeFromBasket,
  addToWishlist,
  removeFromWishlist,
  getBasket,
  getWishlist,
  getMe,
  updateProfile,
  updateBasketQuantity,
} from "../controllers/userController.js";
import upload from "../upload/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), register);
userRouter.put("/update", protect, upload.single("image"), updateProfile);
userRouter.get("/verify/:token", verifyEmail);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.post("/resetpassword", resetPassword);
userRouter.post("/basket/add", protect, addToBasket);
userRouter.delete("/basket/remove", protect, removeFromBasket);
userRouter.put("/updateQuantity", protect, updateBasketQuantity);
userRouter.post("/wishlist/add", protect, addToWishlist);
userRouter.delete("/wishlist/remove", protect, removeFromWishlist);
userRouter.get("/basket", protect, getBasket);
userRouter.get("/wishlist", protect, getWishlist);

userRouter.get("/me", protect, getMe);
export default userRouter;
