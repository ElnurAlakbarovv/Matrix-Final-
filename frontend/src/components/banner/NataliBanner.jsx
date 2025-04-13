import React from "react";
import "./nataliBanner.scss";
import { VscQuote } from "react-icons/vsc";
import { PiBicycle } from "react-icons/pi";
import { PiMountainsBold } from "react-icons/pi";
import { LuBadgeCheck } from "react-icons/lu";
import { SlPresent } from "react-icons/sl";
const NataliBanner = () => {
  return (
    <>
      <div className="nataliBanner my-5">
        <div className="container">
          <div>
            <VscQuote />
          </div>
          <div>
            <em className="em">
              Duis tincidunt sed in massa justo ac vestibulum senectus vulputate
              pulvinar risus consequat lacus vestibulum arcu. Amet nulla nibh
              feugiat purus sodales egestas risus adipiscing justo. Varius sit
              mauris purus dignissim dis sed. In nibh tempor leo rhoncusme.
            </em>
          </div>
          <span>Natali Ritchie</span>
        </div>
      </div>
      <div className="container py-5 ">
        <div className="row">
          <div className="col-lg-6 mb-5">
            <div className="d-flex aboutRide">
              <div className="numIcon">
                <PiBicycle />
              </div>
              <div className="textContent">
                <h3>Customer Focused Business</h3>
                <div>Sed adipiscing diam donec adipiscing tristique risus</div>
              </div>
            </div>
            <p className="text-secondary py-3">
              Vitae aliquet nec ullamcorper sit amet risus nullam. Pharetra diam
              sit amet nisl. Magna etiam tempor orci eu lobortis elementum nibh.
              Dis parturient montes nascetur ridiculus mus mauris.
            </p>
          </div>
          <div className="col-lg-6 mb-5">
            <div className="d-flex aboutRide">
              <div className="numIcon">
                <PiMountainsBold />
              </div>
              <div className="textContent">
                <h3>Break Market Competition</h3>
                <div>
                  Pellentesque habitant morbi tristique senectus et netus
                </div>
              </div>
            </div>
            <p className="text-secondary py-3">
              Lectus magna fringilla urna porttitor rhoncus dolor purus non
              enim. Viverra suspendisse potenti nullam ac tortor vitae purus
              faucibus eugiat in ante metus dictum at tempor commodo.
            </p>
          </div>
          <div className="col-lg-6 mb-5 ">
            <div className="d-flex aboutRide">
              <div className="numIcon">
                <LuBadgeCheck />
              </div>
              <div className="textContent">
                <h3>Good Customer Relationship</h3>
                <div>Mattis vulputate enim nulla aliquet porttitor lacus</div>
              </div>
            </div>
            <p className="text-secondary py-3">
              Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus
              egestas fringilla phasellus faucibus scelerisque eleifend donec
              pretium libero nunc consequat interdum lorem dolor sed viverra
              ipsum nunc aliquet.
            </p>
          </div>
          <div className="col-lg-6 mb-5">
            <div className="d-flex aboutRide">
              <div className="numIcon">
                <SlPresent />
              </div>
              <div className="textContent">
                <h3>Break Market Competition</h3>
                <div>
                  Pellentesque habitant morbi tristique senectus et netus.
                </div>
              </div>
            </div>
            <p className="text-secondary py-3">
              Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam
              vehicula sit amet facilisis magna etiam tempor orci eu lobortis
              elementum massa tincidunt dui ut ornare lectus sit amet est
              placerat.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NataliBanner;
