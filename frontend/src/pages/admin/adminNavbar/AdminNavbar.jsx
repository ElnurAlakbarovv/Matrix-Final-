import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../../redux/features/userSlice";
import showToast from "../../../components/Toasts";
import "./adminNavbar.scss"

const AdminNavbar = () => {
  const baseUrl = "http://localhost:5000/auth";
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await axios.post(`${baseUrl}/logout`);

    dispatch(setUser(null));

    if (res.status === 200) {
      showToast("Logout successful", "dark");
    } else {
      alert("Logout failed");
    }
  };

  return (
    <div className="admin-navbar-section">
      <div className="container">
        <div className="navbar">
          <ul className="navlist">
            <li className="navlist-item">
              <Link to="/admin/adminPanel">Admin</Link>
            </li>
            <li className="navlist-item">
              <Link to="/admin/adminBlog">Blog</Link>
            </li>
          </ul>
          <div className="wrapper">
            <div className="dropdown">
              <button
                className="btn btn-light"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="fa-solid fa-user"></i>
                Logout
              </button>
              <ul className="dropdown-menu">
                <li onClick={handleLogout}>
                  <Link className="dropdown-item logout " to="/">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
