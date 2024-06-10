import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-container">
      <img src="./logo192.png" alt="logo" className="logo" />
      <h1 className="header-text">Playlist Builder</h1>
    </header>
  );
};

export default Header;
