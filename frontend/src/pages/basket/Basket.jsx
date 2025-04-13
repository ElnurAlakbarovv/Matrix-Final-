import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkoutBasket,
  getBasket,
  removeFromBasket,
  updateBasketQuantity,
} from "../../redux/features/userSlice";
import "./Basket.scss";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineArrowOutward } from "react-icons/md";
import showToast from "../../components/Toasts";

const Basket = () => {
  const { basket } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getBasket());
  }, []);

  const total = basket.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showModal, setShowModal] = useState(false); 
  const [modalData, setModalData] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  }); 

  const applyCoupon = () => {
    if (coupon === "HELLO20") {
      setDiscount(0.2);
      showToast("Coupon applied successfully!", "success");
    } else {
      setDiscount(0);
      showToast("Invalid coupon code", "error");
    }
  };

  const handleCheckout = () => {
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    if (!modalData.name || !modalData.address || !modalData.phone || !modalData.email) {
      showToast("Please fill in all fields", "error");
      return;
    }

    dispatch(checkoutBasket())
      .unwrap()
      .then(() => {
        showToast("Checkout successful", "success");
        localStorage.setItem("checkoutData", JSON.stringify({ basket, modalData })); // Store basket data and modal data in localStorage
      })
      .catch((error) => {
        showToast("Checkout failed", "error");
      });

    setTimeout(() => {
      navigate("/shop");
    }, 2000);

    setShowModal(false); // Close the modal after submitting
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const discountedTotal = total - total * discount;

  return (
    <div>
      <div className="basket-container">
        <h1>Your Basket</h1>
        <div className="basket-items">
          {basket &&
            basket.map((product) => (
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

        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={basket.length === 0}
        >
          Checkout
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Checkout</h2>
            <p>Are you sure you want to proceed with the checkout?</p>

            {/* Checkout Form Inputs */}
            <div className="checkout-form">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={modalData.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Shipping Address"
                value={modalData.address}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={modalData.phone}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={modalData.email}
                onChange={handleInputChange}
              />
            </div>

            <button onClick={handleModalSubmit}>Yes, Proceed</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
