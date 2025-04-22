import React from "react";
import MainContentHeader from "../components/main/MainContentHeader";
import AIChatButton from "../components/main/AIChatBot";
import PlayerOverview from "../components/main/PlayerOverview";
import "../assets/styles/Home.css";

const Home = () => {
  return (
    <div className="container">
      <MainContentHeader />
      <PlayerOverview />
      <AIChatButton />
    </div>
  );
};

export default Home;
