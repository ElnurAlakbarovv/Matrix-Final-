import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { loginschema } from "../../../schema/LoginSchema";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../../redux/features/userSlice";
import "./login.scss";
import showToast from "../../../components/Toasts";

const Login = () => {
  const baseUrl = "http://localhost:5000/auth";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = async (values, actions) => {
    try {
      const res = await axios.post(`${baseUrl}/login`, values, {
        withCredentials: true,
      });
      if (res.status === 200) {
        const userData = res.data.existUser;
        dispatch(setUser(userData));
        showToast("Login Success", "success");
        if (userData.role === "admin") {
          navigate("/admin/adminPanel");
        } else {
          navigate("/");
        }
      } else {
        showToast("Login failed", "error");
      }

      actions.resetForm();
    } catch (error) {
      showToast("Login failed", "error");
    }
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: submitForm,
    validationSchema: loginschema,
  });

  return (
    <div className="loginPage">
      <div className="container">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h3>Login</h3>

          <div className="form-group">
            <label htmlFor="username">
              Username<span className="text-danger">*</span>
            </label>
            <div className="text-danger">{errors.username}</div>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              onChange={handleChange}
              value={values.username}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password<span className="text-danger">*</span>
            </label>
            <div className="text-danger">{errors.password}</div>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              value={values.password}
            />
          </div>
          <span>
            <Link to="/forgotpassword" className="text-warning">
              Forgot password?
            </Link>
          </span>

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>

          <span>
            <Link to="/register" className="text-dark">
              Don't have an account?
            </Link>
          </span>
          <div>
            <Link to="/">Back to HOME</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
