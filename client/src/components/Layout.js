import React from "react";
import UserSelector from "./UserSelector";
import "../assets/styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <h1>Chess Stats Tracker</h1>
        <p className="subheader">Track. Analyze. Get better.</p>
      </header>
      <UserSelector />
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
