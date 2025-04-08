import React from "react";
import MainContentHeader from "../components/main/MainContentHeader";
import AIChatButton from "../components/main/AIChatBot";
import "../assets/styles/Home.css";

const Home = () => {
  return (
    <div className="container">
      <MainContentHeader />
      <AIChatButton />
    </div>
  );
};

export default Home;
