import React from "react";
import { useFormik } from "formik";
import { forgotschema } from "../../../schema/ForgotSchema";
import axios from "axios";
import "./forgot.scss";
import { Link } from "react-router-dom";
import showToast from "../../../components/Toasts";

const ForgotPassword = () => {
  const baseUrl = `http://localhost:5000/auth`;

  const submitForm = async (values, actions) => {
    try {
      const res = await axios.post(`${baseUrl}/forgotpassword`, values, {
        withCredentials: true,
      });
      if (res.status === 200) {
        showToast("Check your email to reset your password", "warning");
      } else {
        showToast("Failed to send email", "error");
      }

      actions.resetForm();
    } catch (error) {
      showToast("Failed to send email", "error");
    }
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: submitForm,
    validationSchema: forgotschema,
  });

  return (
    <div className="forgotPage">
      <div className="container">
        <form
          action=""
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h3>Forgot Password</h3>

          <div className="form-group">
            <label htmlFor="username">
              Email<span className="text-danger">*</span>
            </label>
            <div className="text-danger">{errors.email}</div>
            <input
              placeholder="Enter your email"
              type="text"
              id="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={values.email}
            />
          </div>
          <button type="submit">Send</button>
          <div>
            <Link to="/">Back to HOME</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
