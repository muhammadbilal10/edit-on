import React from "react";
import Navbar from "../Navbar";
import Intro from "./Intro";
import Upload from "../Upload";
import TestForm from "../skillTest/TestForm";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="relative">
      
        <Intro />
        <Upload />
        {/* <TestForm /> */}
      </div>
    </div>
  );
};

export default Home;
