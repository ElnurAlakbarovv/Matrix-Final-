import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/features/userSlice";
import "./dashboard.scss";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    image: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        password: "",
        image: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("username", formData.username);
    formDataObj.append("email", formData.email);
    if (formData.password) {
      formDataObj.append("password", formData.password);
    }
    if (formData.image) {
      formDataObj.append("image", formData.image);
    }

    dispatch(updateProfile(formDataObj));
  };

  return (
    <div className="profile-container">
      <h2>Update Profile Information</h2>
      <form
        onSubmit={handleSubmit}
        className="profile-form"
        encType="multipart/form-data"
      >
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password (leave blank if you don't want to change it):</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <label>Image:</label>
        <input type="file" name="image" onChange={handleFileChange} />
        <div className="dashboard-img">
          <img src={`http://localhost:5000/${user?.image}`} alt="" />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Dashboard;
