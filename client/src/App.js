import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./pages/home";
// import AnalyzeGames from './components/AnalyzeGames';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
