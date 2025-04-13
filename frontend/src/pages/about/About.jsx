import React, { useState } from "react";
import { MdKeyboardArrowRight, MdOutlineArrowOutward } from "react-icons/md";
import "./about.scss";
import { AiOutlineSafety } from "react-icons/ai";
import { IoIosBicycle } from "react-icons/io";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CiRead, CiUnread } from "react-icons/ci";



const About = () => {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { question: "What types of bikes do you offer?", answer: "We offer a wide range of bikes including mountain bikes, road bikes, electric bikes, and hybrid bikes." },
    { question: "Do you provide international shipping?", answer: "Yes, we ship our bikes internationally. Shipping costs and delivery times vary by location." },
    { question: "Can I return a bike if I am not satisfied?", answer: "Yes, we have a 30-day return policy for unused bikes in their original condition." },
    { question: "Do your bikes come with a warranty?", answer: "Yes, all our bikes come with a manufacturer warranty covering defects and manufacturing issues." },
    { question: "How do I maintain my bike?", answer: "Regular maintenance includes checking tire pressure, lubricating the chain, and ensuring brakes and gears are functioning properly." }
  ];

  return (
    <div className="aboutPage">
      <div className="headerShop">
        <div className="container py-5">
          <div className="d-flex align-items-center pb-2">
            <h6>HOME</h6> <MdKeyboardArrowRight /> <h5>ABOUT</h5>
          </div>
          <div className="aboutPageIntro">
            REDISCOVER THE WORLD ON TWO WHEELS
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <h2>Our Mission To Achieve Our Ambitious Goals</h2>
          <div className="col-lg-6 col-md-12 col-sm-12 mb-5 d-flex aboutContent">
            <div className="numIcon">1</div>
            <div className="textContent">
              <h3>Customer Focused Business</h3>
              <div>
                Purus gravida quis blandit turpis cursus in hac habitasse magna
                fringilla urna porttitor ullamcorper malesuada.
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 mb-5 d-flex aboutContent">
            <div className="numIcon">2</div>
            <div className="textContent">
              <h3>Break Market Competition</h3>
              <div>
                PSed faucibus turpis in eu mi bibendum neque egestas porttitor
                rhoncus dolor purus pellentesque dignissim.
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 mb-5 d-flex aboutContent">
            <div className="numIcon">3</div>
            <div className="textContent">
              <h3>Good Customer Relationship</h3>
              <div>
                Porta nibh venenatis cras sed felis habitant morbi tristique
                senectus et netus et malesuada ullamcorper malesuada.
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 mb-5 d-flex aboutContent">
            <div className="numIcon">4</div>
            <div className="textContent">
              <h3>Break Market Competition</h3>
              <div>
                Massa sed elementum tempus egestas ultrices neque ornare aenean
                euismod elementum scelerisque eleifend.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="aboutRediscover">
        <div className="container py-5 my-5">
          <div className="row ">
            <div className="col-lg-6 col-md-12 col-sm-12 d-flex aboutRediscoverImg">
              <img
                src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/about-page-hero-image-1.webp"
                alt=""
              />
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 aboutRediscoverContent">
              <h2>Rediscover the World on Two Wheels</h2>
              <div>
                Penatibus lacus sed nullam sodales. Eleifend dictumst sit in ut
                egestas vestibulum urna massa cursus. Felis iaculis sit leo at
                facilisi tortor eget in eget.
              </div>
              <div className="row my-5">
                <div className="col-lg-6  ">
                  <div className="aboutRediscoverIcon mb-3  ">
                    <AiOutlineSafety />
                  </div>
                  <h3>Penatibus Lacus Varius</h3>
                  <p>
                    Eleifend dictumst sit in ut egestas vestibulum urna massa
                    cursus felis iaculis sit leoat.
                  </p>
                </div>
                <div className="col-lg-6  ">
                  <div className="aboutRediscoverIcon mb-3">
                    <IoIosBicycle />
                  </div>
                  <h3>Vitae Consectetur</h3>
                  <p>
                    Eleifend dictumst sit in ut egestas vestibulum urna massa
                    cursus felis iaculis sit leoat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="whoWeAre">
        <div className="container py-5 text-center">
          <h2>Who We Are</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur vitae consectetur pulvinar
            malesuada elit tellus facilisi suspendisse elit tortor ut tristique.
          </p>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 my-4  persons">
              <div className="person-img">
                <img
                  src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/team-member-1.webp"
                  alt=""
                />
              </div>
              <h3>Michael Peterson</h3>
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
            <div className="col-lg-4 col-md-6 col-sm-12 my-4  persons">
              <div className="person-img">
                <img
                  src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/team-member-2.webp"
                  alt=""
                />
              </div>
              <h3>Jackson Ortega</h3>
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
            <div className="col-lg-4 col-md-6 col-sm-12 my-4  persons">
              <div className="person-img">
                <img
                  src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/team-member-3.webp"
                  alt=""
                />
              </div>
              <h3>Max Williams</h3>
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
            <div className="col-lg-4 col-md-6 col-sm-12 my-4  persons">
              <div className="person-img">
                <img
                  src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/team-member-4.webp"
                  alt=""
                />
              </div>
              <h3>Andrew Colins</h3>
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
            <div className="col-lg-4 col-md-6 col-sm-12 my-4  persons">
              <div className="person-img">
                <img
                  src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/team-member-5.webp"
                  alt=""
                />
              </div>
              <h3>Nick Diego Garcia</h3>
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
            <div className="col-lg-4 col-md-6 col-sm-12 my-4  persons">
              <div className="person-img">
                <img
                  src="https://startersites.io/blocksy/e-bike/wp-content/uploads/2024/04/team-member-6.webp"
                  alt=""
                />
              </div>
              <h3>Tom Emerald</h3>
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
        </div>
      </div>

      <div className="faqSection py-5">
      <div className="container text-center">
        <h2 className="mb-5">Frequently Asked Questions</h2>
        <div className="faqContainer text-center mt-4">
          {faqs.map((faq, index) => (
            <div className="faqItem " key={index}>
              <div className="faqQuestion mt-2" onClick={() => toggleFAQ(index)}>
                <h5 >{faq.question}</h5>
                <span className="fs-4">{openIndex === index ?  <CiUnread />:<CiRead /> }</span>
              </div>
              {openIndex === index && <div className="faqAnswer mb-4">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>

      <div className="questionAbout p-5">
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
            <div className="col-lg-4 col-md-6 col-sm-12"></div>
            <div className="col-lg-4 col-md-6 col-sm-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
