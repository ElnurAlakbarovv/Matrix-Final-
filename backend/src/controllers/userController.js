import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { recieveMail } from "../middleware/mailer/mailer.js";
import jwt from "jsonwebtoken";
import RegisterValidationSchema from "../middleware/validation/RegisterValidation.js";
import LoginValidationSchema from "../middleware/validation/LoginValidation.js";
import ForgotValidationSchema from "../middleware/validation/ForgotValidation.js";
import product from "../models/productModel.js";

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const { filename } = req.file;
    const imageUrl = `images/${filename}`.replace(/\\/g, "/");
    const { error } = RegisterValidationSchema.validate({
      name,
      username,
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existUser = await user.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      image: imageUrl,
      name,
      username,
      email,
      password: hasedPassword,
      basket: [],
      wishlist: [],
    });

    await newUser.save();
    const token = generateToken(newUser._id, res);
    const confirmLink = `${process.env.SERVER_LINK}/auth/verify/${token}`;

    recieveMail(newUser, confirmLink);

    return res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const updatedVerify = await user.findByIdAndUpdate(
      { _id: decoded.id },
      { isVerified: true }
    );

    if (updatedVerify) {
      return res.redirect(`${process.env.CLIENT_LINK}/login`);
    }
  } catch (error) {
    return res.status(400).json({ message: "Token not valid or expired" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { error } = LoginValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existUser = await user.findOne({ username });

    if (!existUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Username or Password wrong" });
    }

    generateToken(existUser._id, res);

    return res.status(200).json({
      message: "User logged in successfully",
      existUser: {
        _id: existUser._id,
        username: existUser.username,
        role: existUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "User logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const { error } = ForgotValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existUser = await user.findOne({ email });

    if (!existUser) return res.status(404).json({ message: "User not found" });

    const resetToken = generateToken(existUser._id, res);
    const resetLink = `${process.env.UI_LINK}/resetpassword/${resetToken}`;

    recieveMail(existUser, resetLink);

    return res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const existUser = await user.findById(decoded.id);

    if (!existUser) {
      return res.status(400).json({ message: "Token not valid or expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    existUser.password = hashedPassword;

    await existUser.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addToBasket = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const existUser = await user.findById(req.user.id);
    if (!existUser) return res.status(404).json({ message: "User not found" });

    const foundProduct = await product.findById(productId);
    if (!foundProduct)
      return res.status(404).json({ message: "Product not found" });

    const basketItem = existUser.basket.find(
      (item) => item.product.toString() === productId.toString()
    );

    if (basketItem) {
      basketItem.quantity += quantity;
    } else {
      existUser.basket.push({ product: productId, quantity });
    }

    await existUser.save();
    await existUser.populate("basket.product");

    return res
      .status(200)
      .json({ message: "Product added to basket", basket: existUser.basket });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeFromBasket = async (req, res) => {
  try {
    const { productId } = req.body;
    const existUser = await user.findById(req.user.id);
    if (!existUser) return res.status(404).json({ message: "User not found" });

    existUser.basket = existUser.basket.filter(
      (item) => item.product.toString() !== productId
    );

    await existUser.save();
    await existUser.populate("basket.product");

    return res.status(200).json({
      message: "Product removed from basket",
      basket: existUser.basket,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const existUser = await user.findById(req.user.id);
    if (!existUser) return res.status(404).json({ message: "User not found" });
    const foundProduct = await product.findById(productId);
    if (!foundProduct)
      return res.status(404).json({ message: "Product not found" });

    if (
      !existUser.wishlist.some((item) => item.product.toString() === productId)
    ) {
      existUser.wishlist.push({ product: productId });
    }

    await existUser.save();
    await existUser.populate("wishlist.product");

    return res.status(200).json({
      message: "Product added to wishlist",
      wishlist: existUser.wishlist,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const existUser = await user.findById(req.user.id);
    if (!existUser) return res.status(404).json({ message: "User not found" });

    existUser.wishlist = existUser.wishlist.filter(
      (item) => item.product.toString() !== productId
    );

    await existUser.save();
    await existUser.populate("wishlist.product");

    return res.status(200).json({
      message: "Product removed from wishlist",
      wishlist: existUser.wishlist,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBasket = async (req, res) => {
  try {
    const existUser = await user
      .findById(req.user.id)
      .populate("basket.product");

    if (!existUser) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      message: "Basket retrieved successfully",
      basket: existUser.basket,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const existUser = await user
      .findById(req.user.id)
      .populate("wishlist.product");

    if (!existUser) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      message: "Wishlist retrieved successfully",
      wishlist: existUser.wishlist,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const existUser = await user.findById(req.user.id).select("-password");

    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User retrieved successfully",
      user: existUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const existUser = await user.findById(req.user.id);
    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, username, email, password } = req.body;
    let imageUrl = existUser.image;

    if (req.file) {
      imageUrl = `images/${req.file.filename}`.replace(/\\/g, "/");
    }

    let hashedPassword = existUser.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    existUser.name = name || existUser.name;
    existUser.username = username || existUser.username;
    existUser.email = email || existUser.email;
    existUser.password = hashedPassword;
    existUser.image = imageUrl;

    await existUser.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: existUser._id,
        name: existUser.name,
        username: existUser.username,
        email: existUser.email,
        image: existUser.image,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBasketQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const existUser = await user.findById(req.user.id);
    if (!existUser) return res.status(404).json({ message: "User not found" });

    const basketItem = existUser.basket.find(
      (item) => item.product.toString() === productId
    );

    if (!basketItem) {
      return res.status(404).json({ message: "Product not found in basket" });
    }

    basketItem.quantity = quantity;

    await existUser.save();
    await existUser.populate("basket.product");

    return res.status(200).json({
      message: "Basket quantity updated",
      basket: existUser.basket,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
