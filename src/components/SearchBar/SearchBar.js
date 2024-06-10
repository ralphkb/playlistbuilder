import React, { useState } from "react";
import "./SearchBar.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

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
      e.preventDefault();
      props.onSearch(searchTerm);
    }
  };

  return (
    <Paper
      className="search-bar"
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "auto",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        name="songTitle"
        type="text"
        placeholder="Enter a song title"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleEnterKey}
        inputProps={{ "aria-label": "search for a song" }}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
