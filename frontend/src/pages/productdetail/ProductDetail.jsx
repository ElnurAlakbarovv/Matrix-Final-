import React from "react";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../../redux/features/userSlice";
import Card from "../../components/card/Card";
import { MdKeyboardArrowRight } from "react-icons/md";
import showToast from "../../components/Toasts"; 

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const user = useSelector((state) => state.user); // User məlumatı

  const findProduct = products.find((product) => String(product._id) === id);

  if (!findProduct) {
    return <p>Loading...</p>;
  }

  const handleAddToBasket = () => {
    if (!user) {
      showToast("Please login to add to the basket", "warning");
    } else {
      dispatch(addToBasket({ productId: findProduct._id, quantity: 1 }));
      showToast("Product added to basket", "success");
    }
  };

  return (
    <div className="container">
      <div className="row py-5">
        <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
          <div className="detail-image pb-3">
            <img src={`http://localhost:5000/${findProduct.image}`} alt="" />
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="detail-breadcrumb">
            <span>Home</span> <MdKeyboardArrowRight /> <span>Shop</span>
            <MdKeyboardArrowRight /> <span>{findProduct.category}</span>
            <MdKeyboardArrowRight /> <span>{findProduct.title}</span>
          </div>
          <div className="detail-content">
            <h1 className="detail-title">{findProduct.title}</h1>
            <p className="detail-price">${findProduct.price}.00</p>
            <p className="detail-description fs-6 fw-lighter">
              {findProduct.description}
            </p>
            <hr />
            <div className="detail-category">
              <span className="fw-bold">Category:</span> {findProduct.category} bike
            </div>
            <button
              className="btn btn-primary mybtn"
              onClick={handleAddToBasket}
            >
              Add to Basket
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-5 sameProduct">
        {products
          .filter(
            (product) =>
              product.category === findProduct.category &&
              product._id !== findProduct._id
          )
          .map((product) => (
            <Card key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductDetail;
