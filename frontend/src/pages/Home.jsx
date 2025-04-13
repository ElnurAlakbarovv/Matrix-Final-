import React from "react";
import Hero from "../components/hero/Hero";
import Banner from "../components/banner/Banner";
import Bikes from "../components/bikes/Bikes";
import NataliBanner from "../components/banner/NataliBanner";
import Question from "../components/question/Question";

const Home = () => {
  return (
    <div>
      <Hero />
      <Banner />
      <Bikes />
      <NataliBanner />
      <Question />
    </div>
  );
};

export default Home;
