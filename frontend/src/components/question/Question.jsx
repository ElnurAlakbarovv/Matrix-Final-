import React from "react";
import "./question.scss";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
const Question = () => {
  return (
    <div className="question p-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12"></div>
          <div className="col-lg-4 col-md-6 col-sm-12"></div>
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
  );
};

export default Question;
