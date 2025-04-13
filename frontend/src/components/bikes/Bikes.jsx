import React, { useEffect } from "react";
import "./bikes.scss";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/ProductSlice";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

const Bikes = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section className="bikes-section">
      <div className="container pt-5">
        <div className="bike-heading m-5">
          <h2>Feel the Charge of Change</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur vitae consectetur pulvinar
            malesuada elit tellus facilisi suspendisse elit tortor ut tristique.
          </p>
        </div>
        <div className="row bikesCards">
          {products &&
            products.slice(0, 3).map((product) => {
              return <Card key={product._id} product={product} />;
            })}
        </div>
        <div className="seeAllBikes">
          <Link to="/shop">
            {" "}
            <button>
              See All
              <GoArrowUpRight />{" "}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Bikes;
