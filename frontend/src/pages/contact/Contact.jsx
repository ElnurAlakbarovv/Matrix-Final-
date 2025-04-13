import React, { useState } from "react";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import "./contact.scss";
const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailClick = () => {
    window.location.href = "mailto: elnurha-af106@code.edu.az";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    <div className="contact">
      <div className="headerShop">
        <div className="container py-5">
          <div className="d-flex align-items-center pb-2">
            <h6>HOME</h6> <MdKeyboardArrowRight /> <h5>CONTACT</h5>
          </div>
          <div>CONTACT US</div>
        </div>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-5 p-5 contact-text">
            <div className="contactContent">
              <h3>Pharetra Etultrices</h3>
              <p>
                Purus gravida quis blandit turpis cursus in hac habitasse magna
                fringilla urna porttitor ullamcorper malesuada.
              </p>
            </div>
            <div className="contactContent">
              <h3>Egestas Fringilla</h3>
              <p>
                Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus
                phasellus faucibus scelerisque eleifend.
              </p>
            </div>
            <div className="contactContent">
              <h3>Quis Lipsum</h3>
              <p>
                Sed faucibus turpis in eu mi bibendum neque egestas. Urna
                porttitor rhoncus dolor purus non enim neque volutpat ac
                tincidunt.
              </p>
            </div>
            <div className="contactContent">
              <h3>Follow us:</h3>
              <div className="socialNetwork">
                <span>
                  <FaFacebookSquare />
                </span>{" "}
                <span>
                  <FaSquareXTwitter />
                </span>{" "}
                <span>
                  <FaInstagramSquare />
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="contact-form px-5 ">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group row">
                  <div className="form-field">
                    <label>
                      First Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    Email <span>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Your Message <span>*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn" onClick={handleEmailClick}>
                  Submit Form
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="ifreme-contact py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 iframeDiv">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12157.935913963129!2d49.8627002302246!3d40.37596491076891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d079efb5163%3A0xc20aa51a5f0b5e01!2sCode%20Academy!5e0!3m2!1str!2saz!4v1740267574863!5m2!1str!2saz"></iframe>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12  py-5">
              <h2>Provide Sustainable Electric Bikes For Everyone</h2>
              <p>
                Penatibus lacus sed nullam sodales. Eleifend dictumst sit in ut
                egestas vestibulum urna massa cursus. Felis iaculis sit leo at
                facilisi tortor eget in eget.
              </p>
              <div>
                <ul>
                  <li>
                    <IoIosCheckmarkCircleOutline />
                    Lacus nulla curabitur elitmi tempor
                  </li>
                  <li>
                    <IoIosCheckmarkCircleOutline />
                    Pellentesque cras aliquam consectetur
                  </li>
                  <li>
                    <IoIosCheckmarkCircleOutline />
                    Arcu ultricies nibh suspendisse facilisis
                  </li>
                  <li>
                    <IoIosCheckmarkCircleOutline />
                    Quis eleifend quam adipiscing vitae
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
