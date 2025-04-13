import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePage,
  getProducts,
  pagenation,
} from "../../redux/features/ProductSlice";
import Card from "../../components/card/Card";
import "./shop.scss";
import { MdKeyboardArrowRight, MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

const Shop = () => {
  const dispatch = useDispatch();
  const { products, currentPage, totalPages } = useSelector(
    (state) => state.products
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    dispatch(pagenation({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(changePage(page));
  };
  const sortedProducts = [...products]
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
    })
    .filter((product) =>
      product.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

  return (
    <>
      <div className="headerShop">
        <div className="container py-5">
          <div className="d-flex align-items-center pb-2">
            <h6>HOME</h6> <MdKeyboardArrowRight /> <h5>SHOP</h5>
          </div>
          <div>SHOP</div>
        </div>
      </div>
      <div className="container py-5">
        <div className="filter-section p-5">
          <input
            type="text"
            placeholder="Search title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="default">Sort by Title (Default)</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
        <div className="row">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <Card key={product._id} product={product} />
            ))
          ) : (
            <p className="no-results">No products found.</p>
          )}
        </div>
        <div className="pageSection">
          <button
            className="paginationPrev"
            onClick={() => {
              handlePageChange(currentPage - 1);
            }}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <div className="paginationPages">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                className={`paginationPage ${
                  index + 1 === currentPage ? "active" : ""
                }`}
                key={index}
                onClick={() => {
                  handlePageChange(index + 1);
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            className="paginationPrev"
            onClick={() => {
              handlePageChange(currentPage + 1);
            }}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div className="questionShop p-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 questionBox">
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
            <div className="col-lg-4"></div>
            <div className="col-lg-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
