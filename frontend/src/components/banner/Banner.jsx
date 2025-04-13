import React from "react";
import { GiEcology } from "react-icons/gi";
import { AiOutlineSafety } from "react-icons/ai";
import { PiPackage } from "react-icons/pi";
import "./Banner.scss";
const Banner = () => {
  return (
    <div className="home-banner py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-12 col-sm-12 d-flex banner-top-list">
            <div className="hero-banner-icon">
              <GiEcology />
            </div>
            <div className="hero-banner-text">
              <h3>Eco Friendly</h3>
              <div>
                Elit tortor ut tristique eupurus venenatis id amet in
                pellentesque aliquet lacus.
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 d-flex banner-top-list">
            <div className="hero-banner-icon">
              <AiOutlineSafety />
            </div>
            <div className="hero-banner-text">
              <h3>3 Years Warranty</h3>
              <div>
                Vitae consectetur pulvinar malesuada elit tellus facilisi
                suspendisse tomtorut.
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 d-flex banner-top-list">
            <div className="hero-banner-icon">
              <PiPackage />
            </div>
            <div className="hero-banner-text">
              <h3>Fast Delivery</h3>
              <div>
                Malesuada faucibus quis auctor integer rhoncus nulla pharetra
                consequat.
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-5 bottomBannerAll">
          <div className="col-lg-4 col-md-4  banner-bottom banImg-1">
            <h3>City Bikes</h3>
            <div>
              Quam vulputate dignissim suspendisse in est ante in adipiscing
              vitae.
            </div>
          </div>
          <div className="col-lg-4 col-md-4 banner-bottom banImg-2">
            <h3>Road Bikes</h3>
            <div>
              Condimentum mattis pellentesque id nibh tortor id aliquet lectus.
            </div>
          </div>
          <div className="col-lg-4 col-md-4  banner-bottom banImg-3">
            <h3>Mountain Bikes</h3>
            <div>
              Malesuada fames ac turpis egestas maecenas pharetra convallis
              posuere.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
