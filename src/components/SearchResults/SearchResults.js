import React from "react";
import TrackList from "../Tracklist/Tracklist.js";
import Box from "@mui/material/Box";
import SearchBar from "../SearchBar/SearchBar";

const SearchResults = (props) => {
  return (
    <Box
      className="Box-Mui"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: 6,
        position: "relative",
        width: "100%",
        minHeight: "650px",
        padding: "20px",
        backgroundColor: "#1db954",
        borderRadius: "10px",
        border: "2px solid #000",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        "&::before": {
          content: '"Search Results"',
          position: "absolute",
          top: "-30px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "30px",
          backgroundColor: "#000",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "15px 15px 0 0",
          border: "2px solid #000",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          fontWeight: "bold",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100px",
          height: "10px",
          backgroundColor: "#000",
          borderRadius: "0 0 5px 5px",
        },
      }}
    >
      <SearchBar onSearch={props.onSearch} />
      <TrackList tracks={props.searchResults} onAdd={props.onAdd} />
    </Box>
  );
};

export default SearchResults;
