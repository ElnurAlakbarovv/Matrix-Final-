import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Admin from "./pages/admin/Admin";
import ProductDetail from "./pages/productdetail/ProductDetail";
import Basket from "./pages/basket/Basket";
import Wishlist from "./pages/wishlist/Wishlist";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import ForgotPassword from "./pages/auth/forgotpassword/ForgotPassword";
import Resetpassword from "./pages/auth/resetpassword/Resetpassword";
import { useDispatch } from "react-redux";
import { getMe } from "./redux/features/userSlice";
import { useEffect } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import AdminLayout from "./pages/admin/AdminLayout/AdminLayout";
import AdminBlog from "./pages/admin/adminBlog/AdminBlog";
import PrivateRoute from "./PrivateRoute";
import Shop from "./pages/shop/Shop";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Blog from "./pages/blog/Blog";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "blog", element: <Blog /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "basket", element: <Basket /> },
      { path: "wishlist", element: <Wishlist /> },
      {
        path: "dashboard",
        element: <PrivateRoute role="user" />,
        children: [{ path: "", element: <Dashboard /> }],
      },
      { path: "productdetail/:id", element: <ProductDetail /> },
    ],
  },
  { path: "register", element: <Register /> },
  { path: "login", element: <Login /> },
  { path: "forgotpassword", element: <ForgotPassword /> },
  { path: "resetpassword/:token", element: <Resetpassword /> },
  {
    path: "admin",
    element: <PrivateRoute role="admin" />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { path: "adminPanel", element: <Admin /> },
          { path: "adminBlog", element: <AdminBlog /> },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
