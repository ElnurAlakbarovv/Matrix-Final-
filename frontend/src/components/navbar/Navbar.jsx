import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { PiBicycleThin } from "react-icons/pi";
import { FaOpencart } from "react-icons/fa";
import { VscHeart } from "react-icons/vsc";
import { PiUserLight } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { CiLocationOn } from "react-icons/ci";
import { LuPhoneCall } from "react-icons/lu";
import { MdLanguage, MdOutlineAlternateEmail } from "react-icons/md";
import axios from "axios";
import { BsTools } from "react-icons/bs";
import {
  getBasket,
  getWishlist,
  setUser,
} from "../../redux/features/userSlice";
import showToast from "../Toasts";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
// theme slice’inden toggleDarkMode aksiyonunu import edin
import { toggleDarkMode } from "../../redux/features/themeSlice";

const Navbar = () => {
  const { t } = useTranslation();
  const baseUrl = "http://localhost:5000/auth";
  const { user, basket, wishlist } = useSelector((state) => state.user);
  // theme reducer'ından darkMode değerini çekiyoruz
  const { darkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Dark mode sınıfını body'e ekleyin
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogout = async () => {
    const res = await axios.post(`${baseUrl}/logout`);
    dispatch(setUser(null));
    if (res.status === 200) {
      showToast(t("navbar.logoutSuccess"), "dark");
    } else {
      alert("Logout failed");
    }
  };

  useEffect(() => {
    dispatch(getBasket());
    dispatch(getWishlist());
  }, [dispatch]);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const totalCount = basket.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  const handleEmailClick = () => {
    window.location.href = "mailto: elnurha-af106@code.edu.az";
  };

  const handleCallClick = () => {
    window.location.href = "tel:+994776360060";
  };

  const handleLocationClick = () => {
    window.location.href = "https://maps.app.goo.gl/gRx8mfSzVgCNRUB39";
  };

  return (
    <div className="navbar-section">
      <div className="banNavbar">
        <div className="container">
          <div className="banNavbar-left">
            <div onClick={handleEmailClick}>
              <MdOutlineAlternateEmail /> {t("navbar.email")}
            </div>
            <div onClick={handleCallClick}>
              <LuPhoneCall /> {t("navbar.phone")}
            </div>
          </div>
          <div onClick={handleLocationClick} className="banNavbar-right">
            <CiLocationOn /> {t("navbar.address")}
          </div>
        </div>
      </div>

      <div className="navbar">
        <div className="container">
          <div className="bike-logo">
            <Link to="/">
              <PiBicycleThin />
            </Link>
          </div>
          <div
            className={`burger-menu ${menuOpen ? "active" : ""}`}
            onClick={handleToggleMenu}
          >
            <GiHamburgerMenu />
          </div>

          <ul className={`navlist ${menuOpen ? "open" : ""}`}>
            <li className="navlist-item">
              <Link to="/">{t("navbar.home")}</Link>
            </li>
            <li className="navlist-item">
              <Link to="/shop">{t("navbar.shop")}</Link>
            </li>
            <li className="navlist-item">
              <Link to="/about">{t("navbar.about")}</Link>
            </li>
            <li className="navlist-item">
              <Link to="/blog">{t("navbar.blog")}</Link>
            </li>
            <li className="navlist-item">
              <Link to="/contact">{t("navbar.contact")}</Link>
            </li>
          </ul>
          <div className="wrapper">
            <div className="basket">
              <Link to="/dashboard">
                <PiUserLight />
              </Link>
            </div>
            <div className="heart">
              <Link to="/wishlist">
                <VscHeart />
                <sup>{totalWishlistCount}</sup>
              </Link>
            </div>
            <div className="basket">
              <Link to="/basket">
                <FaOpencart />
              </Link>
              <sup>{totalCount}</sup>
            </div>

            <div className="userNameNav">{user ? `${user.name}` : ""}</div>
            <div className="dropdown">
              <button
                className="btn btn-light"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="fa-solid fa-user"></i>
                {user ? t("navbar.logout") : t("navbar.login")}
              </button>
              <ul className="dropdown-menu">
                {user ? (
                  <li onClick={handleLogout}>
                    <Link className="dropdown-item logout" to="/login">
                      {t("navbar.logout")}
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item register" to="/register">
                        {t("navbar.register")}
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item login" to="/login">
                        {t("navbar.login")}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="language-dropdown dropdown">
              <button
                className="btn btn-light text-dark fs-5 "
                type="button"
                data-bs-toggle="dropdown"
              >
                <BsTools />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="langdropdown-item"
                    onClick={() => {
                      i18n.changeLanguage("az");
                    }}
                  >
                    Az
                  </button>
                </li>
                <li>
                  <button
                    className="langdropdown-item"
                    onClick={() => {
                      i18n.changeLanguage("en");
                    }}
                  >
                    En
                  </button>
                </li>
                {/* Dark/Light Mode Toggle Seçeneğini Ekliyoruz */}
                <li>
                  <button
                    className="langdropdown-item"
                    onClick={() => dispatch(toggleDarkMode())}
                  >
                    {darkMode ? "Dark Mode" : "Light Mode"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
