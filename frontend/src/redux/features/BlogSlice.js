import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000/api/blog"; // API URL bloga uyğun dəyişdirildi
const initialState = {
  blogs: [],
  allBlogs: [],
};

// Bütün blogları gətir
export const getBlogs = createAsyncThunk("blog/getBlogs", async () => {
  const { data } = await axios.get(baseURL);
  return data;
});

// Yeni blog əlavə et
export const addBlog = createAsyncThunk("blog/addBlog", async (blog) => {
  const formData = new FormData();
  formData.append("title", blog.title);
  formData.append("description", blog.description);
  formData.append("date", blog.date);
  if (blog.image) {
    formData.append("image", blog.image);
  }

  const { data } = await axios.post(baseURL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
});

// Blogu sil
export const deleteBlog = createAsyncThunk("blog/deleteBlog", async (id) => {
  await axios.delete(`${baseURL}/${id}`);
  return id;
});

// Blogu yenilə
export const updateBlog = createAsyncThunk("blog/updateBlog", async ({ id, blog }) => {
  const formData = new FormData();
  formData.append("title", blog.title);
  formData.append("description", blog.description);
  formData.append("date", blog.date);
  if (blog.image) {
    formData.append("image", blog.image);
  }

  const { data } = await axios.put(`${baseURL}/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
});

// Blog axtarış
export const searchBlog = createAsyncThunk("blog/searchBlog", async (search, { getState }) => {
  if (search === "") {
    return getState().blog.allBlogs;
  }
  const { data } = await axios.get(`${baseURL}/search/${search}`);
  return data;
});

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.allBlogs = action.payload;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((item) => item._id !== action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(searchBlog.fulfilled, (state, action) => {
        state.blogs = action.payload;
      });
  },
});

export default blogSlice.reducer;
