import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { registerschema } from "../../../schema/RegisterSchema";
import "./register.scss";
import { Link } from "react-router-dom";
import showToast from "../../../components/Toasts";

const Register = () => {
  const baseUrl = "http://localhost:5000/auth";

  const submitForm = async (values, actions) => {
    console.log(values);
    try {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      await axios.post(`${baseUrl}/register`, formData);

      actions.resetForm();
      showToast("Please check your email to verify your account.", "warning");
    } catch (error) {
      showToast("Registration failed, please try again.", "error");
    }
  };

  const { values, handleChange, handleSubmit, setFieldValue, errors } =
    useFormik({
      initialValues: {
        image: null,
        name: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
      onSubmit: submitForm,
      validationSchema: registerschema,
    });

  return (
    <div className="registerPage">
      <div className="container">
        <form
          encType="multipart/form-data"
          action=""
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h3>Register</h3>

          <div className="form-group">
            <label htmlFor="image">
              Image<span className="text-danger">*</span>
            </label>
            <input
              type="file"
              id="image"
              className="form-control"
              onChange={(e) => setFieldValue("image", e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <div className="text-danger">{errors.name}</div>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              onChange={handleChange}
              value={values.name}
            />
          </div>

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
            <label htmlFor="email">
              Email<span className="text-danger">*</span>
            </label>
            <div className="text-danger">{errors.email}</div>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={values.email}
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

          <div className="form-group">
            <label htmlFor="confirmpassword">
              Confirm Password<span className="text-danger">*</span>
            </label>
            <div className="text-danger">{errors.confirmpassword}</div>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              className="form-control"
              onChange={handleChange}
              value={values.confirmpassword}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign-Up
          </button>

          <span>
            <Link to="/login" className="text-dark">
              Already have an account?
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

export default Register;
