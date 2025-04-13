import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import "./Hero.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="pb-5">
      <section className="hero-section">
        <div className="container">
          <div className="row py-5 ">
            <div className="col-lg-6 col-md-12 heroLeft">
              <h2>{t("hero.title")}</h2>
              <div className="heroButtonDiv">
                <Link to="/shop">
                  <button>
                    {t("hero.button")} <MdOutlineArrowOutward />
                  </button>
                </Link>
              </div>
              <div className="row py-5 heroLeftInside">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <h1>250k</h1>
                  <div>{t("hero.stats.customers")}</div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <h1>300</h1>
                  <div>{t("hero.stats.reviews")}</div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <h1>32</h1>
                  <div>{t("hero.stats.shops")}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 heroRight">
              <div className="mb-5">
                {t("hero.desc")}
              </div>
              <div className="m-0 p-0 heroRightImage">
                <img
                  src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/home-hero-image.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mb-5">
        <div className="row hero-bottom">
          <div className="col hero-bottom-left">
            <img
              src="https://intensecycles.com/cdn/shop/files/Free-Battery-Image_1387ebbc-e0f4-444e-8d06-48c1ed46e0ea.png?v=1738084591&width=2400"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
