import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromWishlist,
} from "../../redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import "./wishlist.scss";
import {
  MdOutlineAddShoppingCart,
  MdOutlineArrowOutward,
} from "react-icons/md";
import showToast from "../../components/Toasts";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleAddToBasket = (product) => {
    if (!user) {
      showToast("Please login to add to the basket", "warning");
    } else {
      dispatch(addToBasket({ productId: product._id, quantity: 1 }));
      showToast("Product added to basket", "success");
    }
  };

  return (
    <div>
      <div className="wishlist-container my-5 p-5">
        <h1>Your Wishlist</h1>
        <div className="wishlist-items">
          {wishlist &&
            wishlist.map((product) => (
              <div className="wishlist-item" key={product._id}>
                <img
                  src={`http://localhost:5000/${product.product.image}`}
                  alt=""
                  className="wishlist-image"
                  onClick={() => navigate(`/productdetail/${product._id}`)}
                />

                <div className="item-info">
                  <span>{product.product.title}</span>
                  <small>{product?.product.category}</small>
                </div>

                <span className="item-price">${product.product.price}</span>
                <div className="wish-buttons">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToBasket(product.product);
                    }}
                  >
                    <MdOutlineAddShoppingCart />
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() =>
                      dispatch(
                        removeFromWishlist(product.product._id),
                        showToast("Deleted from Wishlist", "info")
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="questionWishlist p-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 questionBox">
              <h2>Have Questions?</h2>
              <h4>Feel Free to Contact Us!</h4>
              <p>
                Donec ultrices tincidunt arcu non sodales. Orci eu lobortis
                elementum nibh tellus molestie nunc. Fames ac turpis egestas
                maecenas pharetra convallis posuere morbi.
              </p>
              <Link to="/contact">
                <button>
                  Contact Info <MdOutlineArrowOutward />
                </button>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12"></div>
            <div className="col-lg-4 col-md-6 col-sm-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
