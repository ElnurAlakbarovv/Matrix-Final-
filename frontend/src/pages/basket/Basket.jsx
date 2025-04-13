import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBasket,
  removeFromBasket,
  updateBasketQuantity,
} from "../../redux/features/userSlice";
import "./Basket.scss";
import { Link } from "react-router-dom";
import { MdOutlineArrowOutward } from "react-icons/md";
import showToast from "../../components/Toasts";
import { useState } from "react";

const Basket = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBasket());
  }, []);

  const total = user.basket.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const [coupon, setCoupon] = useState("");
const [discount, setDiscount] = useState(0);

const applyCoupon = () => {
  if (coupon === "HELLO20") {
    setDiscount(0.2); 
    showToast("Coupon applied successfully!", "success");
  } else {
    setDiscount(0);
    showToast("Invalid coupon code", "error");
  }
};

const discountedTotal = total - total * discount;
  return (
    <div>
      <div className="basket-container">
        <h1>Your Basket</h1>
        <div className="basket-items">
          {user.basket &&
            user.basket.map((product) => (
              <div className="basket-item" key={product._id}>
                <img
                  src={`http://localhost:5000/${product?.product?.image}`}
                  alt=""
                />

                <div className="item-info">
                  <div>{product.product?.title}</div>
                  <span>${product.product?.price}</span>
                </div>

                <span className="item-price">
                  ${product.product?.price * product.quantity}
                </span>

                <div className="item-quantity">
                  <button
                    onClick={() =>
                      dispatch(
                        updateBasketQuantity({
                          productId: product.product._id,
                          quantity: product.quantity - 1,
                        })
                      )
                    }
                    disabled={product.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateBasketQuantity({
                          productId: product.product._id,
                          quantity: product.quantity + 1,
                        })
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
  className="remove-btn"
  onClick={() => {
    dispatch(removeFromBasket(product.product._id));
    setDiscount(0); 
    showToast("Deleted from Basket", "info");
  }}
>
  Remove
</button>
              </div>
            ))}
        </div>
        <div className="coupon-section">
  <input
    type="text"
    placeholder="Enter coupon code"
    value={coupon}
    onChange={(e) => setCoupon(e.target.value)}
  />
  <button onClick={applyCoupon}>Apply Coupon</button>
</div>

<p className="total">
  {discount > 0 && <span className="discount-text">Discount Applied: {discount * 100}%</span>}
  FINAL TOTAL: ${discountedTotal.toFixed(2)}
</p>
      </div>
      <div className="questionBasket p-5">
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

export default Basket;
