import React from "react";
import { PiBicycleThin } from "react-icons/pi";
import "./Footer.scss";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineAlternateEmail } from "react-icons/md";

const handleEmailClick = () => {
  window.location.href = "mailto: elnurha-af106@code.edu.az";
};

const handleCallClick = () => {
  window.location.href = "tel:+994776360060";
};

const Footer = () => {
  return (
    <div className="footer">
      <div className=" container">
        <div className="row">
          <div className="col-lg-6 col-md-12 py-5 ">
            <div className="bike-logo">
              <PiBicycleThin />
            </div>
            <div className="footer-contact-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <div onClick={handleCallClick}>
                  <LuPhoneCall />
                </div>
                <div>
                  <div className="footer-contact-label">Phone:</div>
                  <div onClick={handleCallClick}>077-636-00-60</div>
                </div>
              </div>
              <div className="footer-contact-item">
                <div >
                  <MdOutlineAlternateEmail />
                </div>
                <div>
                  <div className="footer-contact-label">Email:</div>
                  <div onClick={handleEmailClick}>elnurha-af106@code.edu.az</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 py-5 footer-email">
            <h3 className="mb-3">Newsletter</h3>
            <div className="footer-contact-text">
              Faucibus scelerisque eleifend donec pretium vulputate. Malesuada
              bibendum arcu vitae elementum curabitur.
            </div>
            <div className="footer-send-Mail">
              <input type="email" />
              <button onClick={handleEmailClick}>Subscribe</button>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div
        className="text-center  text-secondary p-3"
        style={{ backgroundColor: "#0d0e10" }}
      >
        © 2020 Copyright:
        <a className="text-secondary" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </div>
  );
};

export default Footer;
