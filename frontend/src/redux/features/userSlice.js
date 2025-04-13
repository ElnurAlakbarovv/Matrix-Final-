import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  basket: [],
  wishlist: [],
  loading: false,
  error: null,
};

const baseUrl = "http://localhost:5000/auth";
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/register", userData);
      return response.data.newUser;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// 📌 Login user
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", credentials, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data.existUser;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// 📌 Logout user
export const logoutUser = createAsyncThunk("user/logout", async () => {
  await axios.post("/api/auth/logout");
  return null;
});

// 📌 Forgot password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/forgotpassword`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error sending email"
      );
    }
  }
);

// 📌 Reset password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/resetpassword`,
        { token, password },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password reset failed"
      );
    }
  }
);

// 📌 Get basket
export const getBasket = createAsyncThunk(
  "user/getBasket",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/basket`);
      return response.data.basket;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch basket"
      );
    }
  }
);

// 📌 Add to basket
export const addToBasket = createAsyncThunk(
  "user/addToBasket",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/basket/add`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data.basket;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to basket"
      );
    }
  }
);

// 📌 Remove from basket
export const removeFromBasket = createAsyncThunk(
  "user/removeFromBasket",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/basket/remove`, {
        headers: { "Content-Type": "application/json" },
        data: { productId },
      });
      return response.data.basket;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from basket"
      );
    }
  }
);

// 📌 Get wishlist
export const getWishlist = createAsyncThunk(
  "user/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/wishlist`);
      return response.data.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);

// 📌 Add to wishlist
export const addToWishlist = createAsyncThunk(
  "user/addToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/wishlist/add`,
        { productId },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to wishlist"
      );
    }
  }
);

// 📌 Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  "user/removeFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/wishlist/remove`, {
        headers: { "Content-Type": "application/json" },
        data: { productId },
      });
      return response.data.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from wishlist"
      );
    }
  }
);
export const getMe = createAsyncThunk(
  "user/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/auth/me", {
        withCredentials: true,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue("User not authenticated");
    }
  }
);

// 📌 Update Profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseUrl}/update`, updatedData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data.updatedUser;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);
// 📌 Update basket quantity
export const updateBasketQuantity = createAsyncThunk(
  "user/updateBasketQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/updateQuantity`,
        { productId, quantity },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data.basket;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update basket quantity"
      );
    }
  }
);

// 📌 Create slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state) => {
        state.user = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.basket = [];
        state.wishlist = [];
      })
      .addCase(getBasket.fulfilled, (state, action) => {
        state.basket = action.payload;
      })
      .addCase(getBasket.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addToBasket.fulfilled, (state, action) => {
        state.basket = action.payload;
      })
      .addCase(addToBasket.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromBasket.fulfilled, (state, action) => {
        state.basket = action.payload;
      })
      .addCase(removeFromBasket.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateBasketQuantity.fulfilled, (state, action) => {
        state.basket = action.payload;
      })
      .addCase(updateBasketQuantity.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
