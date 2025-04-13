import React, { useEffect, useState } from "react";
import "./Card.scss";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingBasket } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToBasket, addToWishlist } from "../../redux/features/userSlice";
import showToast from "../Toasts";

const Card = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, wishlist } = useSelector((state) => state.user);
  const [color, setColor] = useState(false);
  const findProduct = wishlist.find((item) => item._id === product._id);

  useEffect(() => {
    setColor(!!findProduct);
  }, [wishlist, color]);

  const handleAddToBasket = () => {
    if (!user) {
      showToast("Please login to add to the basket", "warning");
    } else {
      dispatch(addToBasket({ productId: product._id, quantity: 1 }));
      showToast("Product added to basket", "success");
    }
  };

  const handleAddWishlist = () => {
    if (!user) {
      showToast("Please login to add to the wishlist", "warning");
    } else {
      dispatch(addToWishlist(product._id));
      showToast("Product added to wishlist", "success");
    }
  };
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div
        className="cards"
        onClick={() => navigate(`/productdetail/${product._id}`)}
      >
        <div className="image">
          <img src={`http://localhost:5000/${product.image}`} alt="" />
        </div>
        <div className="content">
          <div className="card-title">{product?.title}</div>
          <div className="card-price">${product?.price}.00</div>
          <div className="card-buttons">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToBasket();
              }}
            >
              <FaShoppingBasket />
            </button>
            <button className="heart-icon">
              <IoMdHeartEmpty
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddWishlist();
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
