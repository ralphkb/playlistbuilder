import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    props.onSearch(searchTerm);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      props.onSearch(searchTerm);
    }
  };

  return (
    <div className="searchBar">
      <input
        id="songTitleInput"
        name="songTitle"
        type="text"
        placeholder="Enter a song title"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleEnterKey}
      />
      <button className="searchButton" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
