import React, { useEffect, useState } from "react";
import "./Admin.scss";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  addProduct,
  deleteProduct,
  getProducts,
  searchProduct,
  sortProductHighest,
  sortProductLowest,
  updateProduct,
} from "../../redux/features/ProductSlice";
import { productSchema } from "../../schema/ProductCreateSchema";

const Admin = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
      category: "",
      price: "",
      description: "",
    },
    onSubmit: (values) => {
      if (editMode) {
        dispatch(updateProduct({ id: editId, product: values }));
      } else {
        dispatch(addProduct(values));
      }
      resetForm();
      setOpen(false);
      setEditMode(false);
    },
    validationSchema: productSchema,
  });

  const handleEdit = (product) => {
    setEditMode(true);
    setEditId(product._id);
    setFieldValue("title", product.title);
    setFieldValue("category", product.category);
    setFieldValue("price", product.price);
    setFieldValue("image", product.image);
    setFieldValue("description", product.description);
    setOpen(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      dispatch(getProducts());
    } else {
      dispatch(searchProduct(value));
    }
  };

  return (
    <div className="admin-container">
      {open && (
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h3>{editMode ? "Edit Product" : "Create Product"}</h3>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
            />
            {errors.image && <div className="error">{errors.image}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              onChange={handleChange}
              value={values.title}
            />
            {errors.title && <div className="error">{errors.title}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              onChange={handleChange}
              value={values.category}
            />
            {errors.category && <div className="error">{errors.category}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              onChange={handleChange}
              value={values.description}
            />
            {errors.description && (
              <div className="error">{errors.description}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              onChange={handleChange}
              value={values.price}
            />
            {errors.price && <div className="error">{errors.price}</div>}
          </div>
          <div className="modalButtons">
            <button type="submit" className="btn-submit">
              {editMode ? "Update" : "Add"}
            </button>
            <button
              type="button"
              className="btn-close"
              onClick={() => setOpen(false)}
            >
              X
            </button>
          </div>
        </form>
      )}

      <h2 className="title">Admin Panel</h2>
      <div className="controls">
        <button
          className="btn-create"
          onClick={() => {
            setOpen(true);
            setEditMode(false);
            resetForm();
          }}
        >
          + Create
        </button>
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <div className="sort-buttons">
          <button onClick={() => dispatch(sortProductLowest())}>Low</button>
          <button onClick={() => dispatch(sortProductHighest())}>High</button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
            <th>Settings</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={`http://localhost:5000/${item.image}`}
                    alt=""
                    className="product-img"
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => dispatch(deleteProduct(item._id))}
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

export default Admin;
