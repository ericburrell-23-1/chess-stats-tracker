import React from "react";
import UserSelector from "./UserSelector";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <h1>Chess Stats Tracker</h1>
        <p className="subheader">Track. Analyze. Get better.</p>
      </header>
      <div className="main-container">
        <UserSelector />
        <main className="content">{children}</main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Layout;
