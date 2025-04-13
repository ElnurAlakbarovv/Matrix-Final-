import React from 'react'

const AdminProducts = () => {
  return (
    <div><div className="container">
    {open && (
      <form
        encType="multipart/form-data"
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h3>{editMode ? "Edit Product" : "Create Product"}</h3>
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
          <label htmlFor="category">Category</label>
          <div className="text-danger">{errors.category}</div>
          <input
            type="text"
            id="category"
            className="form-control"
            onChange={handleChange}
            value={values.category}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <div className="text-danger">{errors.description}</div>
          <input
            type="text"
            id="description"
            className="form-control"
            onChange={handleChange}
            value={values.description}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <div className="text-danger">{errors.price}</div>
          <input
            type="text"
            id="price"
            className="form-control"
            onChange={handleChange}
            value={values.price}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          {editMode ? "Update" : "Add"}
        </button>
      </form>
    )}

    <h2 className="text-center my-3">Admin Panel</h2>
    <div className="mb-2 d-flex justify-content-between">
      <button
        className="btn btn-success"
        onClick={() => {
          setOpen(true);
          setEditMode(false);
          resetForm();
        }}
      >
        Create
      </button>
      <input
        type="text"
        onChange={(e) => dispatch(searchProduct(e.target.value))}
        placeholder="Search..."
      />
      <div className="d-flex gap-2">
        <button
          className="btn btn-primary"
          onClick={() => dispatch(sortProductLowest())}
        >
          Low
        </button>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(sortProductHighest())}
        >
          High
        </button>
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
                  style={{ width: "100px", height: "100px" }}
                  src={`http://localhost:5000/${item.image}`}
                  alt=""
                />
              </td>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => dispatch(deleteProduct(item._id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  </div></div>
  )
}

export default AdminProducts