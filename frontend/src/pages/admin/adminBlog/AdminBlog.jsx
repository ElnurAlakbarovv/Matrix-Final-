import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  addBlog,
  deleteBlog,
  getBlogs,
  searchBlog,
  updateBlog,
} from "../../../redux/features/blogSlice";
import { blogSchema } from "../../../schema/blogSchema";
import "./adminBlog.scss";

const AdminBlog = () => {
  const { blogs } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  console.log(blogs);
  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    resetForm,
  } = useFormik({
    initialValues: {
      image: null,
      title: "",
      description: "",
      date: "",
    },
    onSubmit: (values) => {
      if (editMode) {
        dispatch(updateBlog({ id: editId, blog: values }));
      } else {
        dispatch(addBlog(values));
      }
      resetForm();
      setOpen(false);
      setEditMode(false);
    },
    validationSchema: blogSchema,
  });

  const handleEdit = (blog) => {
    setEditMode(true);
    setEditId(blog._id);
    setFieldValue("title", blog.title);
    setFieldValue("description", blog.description);
    setFieldValue("date", blog.date);
    setFieldValue("image", blog.image);
    setOpen(true);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      dispatch(getBlogs());
    } else {
      dispatch(searchBlog(value));
    }
  };

  return (
    <div className="admin-container">
      {open && (
        <form
          encType="multipart/form-data"
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h3>{editMode ? "Edit Blog" : "New Blog"}</h3>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <div className="text-danger">{errors.image}</div>
            <input
              type="file"
              id="image"
              className="form-control"
              onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <div className="text-danger">{errors.title}</div>
            <input
              type="text"
              id="title"
              className="form-control"
              onChange={handleChange}
              value={values.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <div className="text-danger">{errors.description}</div>
            <textarea
              id="description"
              className="form-control"
              rows="3"
              onChange={handleChange}
              value={values.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <div className="text-danger">{errors.date}</div>
            <input
              type="date"
              id="date"
              className="form-control"
              onChange={handleChange}
              value={values.date}
            />
          </div>
          <div className="modalButtons">
            <button type="submit" className="btn-submit">
              {editMode ? "Update" : "Add"}
            </button>
            <button
              type="button"
              className="btn-close "
              onClick={() => setOpen(false)}
            >
              X
            </button>
          </div>
        </form>
      )}

      <h2 className="text-center my-3">Admin Blog Panel</h2>
      <div className="mb-2 d-flex justify-content-between">
        <button
          className="btn m-0 btn-success"
          onClick={() => {
            setOpen(true);
            setEditMode(false);
            resetForm();
          }}
        >
          New Blog
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className="form-control w-25"
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs &&
            blogs.map((blog) => (
              <tr key={blog._id}>
                <td>
                  <img
                    style={{ width: "100px", height: "100px" }}
                    src={`http://localhost:5000/${blog.image}`}
                    alt=""
                  />
                </td>
                <td>{blog.title}</td>
                <td>{blog.description}</td>
                <td>{new Date(blog.date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(deleteBlog(blog._id))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminBlog;
