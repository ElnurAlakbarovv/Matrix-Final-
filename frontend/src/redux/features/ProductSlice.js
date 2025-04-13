import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000/api/products";
const initialState = {
  products: [],
  allProducts: [],
  totalPages: 1,
  currentPage: 1,
};

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const { data } = await axios.get(baseURL);
  return data;
});

export const pagenation = createAsyncThunk(
  "product/pagenation",
  async ({ page = 1, limit = 6 }) => {
    const { data } = await axios.get(
      `${baseURL}/pagination?page=${page}&limit=${limit}`
    );
    return data;
  }
);

// Add a new product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product) => {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("description", product.description);
    if (product.image) {
      formData.append("image", product.image);
    }

    const { data } = await axios.post(baseURL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    await axios.delete(`${baseURL}/${id}`);
    return id;
  }
);

// Update a product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, product }) => {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("image", product.image);

    const { data } = await axios.put(`${baseURL}/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
  }
);

// Search a product
export const searchProduct = createAsyncThunk(
  "product/searchProduct",
  async (search, { getState }) => {
    if (search === "") {
      return getState().product.allProducts;
    }
    const { data } = await axios.get(`${baseURL}/search/${search}`);
    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    sortProductLowest: (state) => {
      state.products = [...state.products].sort((a, b) => a.price - b.price);
    },
    sortProductHighest: (state) => {
      state.products = [...state.products].sort((a, b) => b.price - a.price);
    },
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.allProducts = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(pagenation.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      });
  },
});

export const { sortProductHighest, sortProductLowest, changePage } =
  productSlice.actions;

export default productSlice.reducer;
