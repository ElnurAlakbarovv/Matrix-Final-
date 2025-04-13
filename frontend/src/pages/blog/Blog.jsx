import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../redux/features/blogSlice";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiDiscountPercentLine } from "react-icons/ri";
import "./blog.scss";
import { Link } from "react-router-dom";

const Blog = () => {
  const { blogs } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  return (
    <>
      <div className="headerShop">
        <div className="container py-5">
          <div className="d-flex align-items-center pb-2">
            <h6>HOME</h6> <MdKeyboardArrowRight /> <h5>BLOG</h5>
          </div>
          <div>ARCHIVES</div>
        </div>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 ">
            {blogs &&
              blogs.map((blog) => (
                <div key={blog._id} className="d-flex align-items-center">
                  <div className="blog-image">
                    <img src={`http://localhost:5000/${blog.image}`} alt="" />
                  </div>
                  <div className="blog-content">
                    <h6>On {new Date(blog.date).toLocaleDateString()}</h6>
                    <h2>{blog.title}</h2>
                    <p>{blog.description}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="sidebar-blog">
              <RiDiscountPercentLine />
              <h3>Hot Summer Sale!</h3>
              <Link to={"/Shop"}>
                <button>Shop Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
