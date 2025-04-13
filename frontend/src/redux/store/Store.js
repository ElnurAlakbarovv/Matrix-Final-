import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/ProductSlice";
// import userSlice from "../features/UserSlice";
import  blogSlice  from "../features/blogSlice";
import  userSlice  from "../features/userSlice";
import themeSlice from "../features/themeSlice"
export const store = configureStore({
  reducer: {
    products: productSlice,
    user: userSlice,
    blogs: blogSlice,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

