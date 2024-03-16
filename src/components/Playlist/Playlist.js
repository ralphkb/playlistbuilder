import React from "react";
import "./Playlist.css";
import TrackList from "../Tracklist/Tracklist.js";

const Playlist = (props) => {
  const handleNameChange = (event) => {
    props.onNameChange(event.target.value);
  };

  const handleTypeChange = (event) => {
    props.onTypeChange(event.target.value);
  };

  return (
    <div className="Playlist">
      <div className="flex-row">
        <input
          id="playlistNameInput"
          name="playlistName"
          onChange={handleNameChange}
          defaultValue={"Playlist Name"}
          placeholder="Playlist Name"
        />
        <select
          id="playlistType"
          value={props.playlistType}
          onChange={handleTypeChange}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <TrackList
        tracks={props.playlistTracks}
        isRemoval={true}
        onRemove={props.onRemove}
      />
      <button className="PlaylistSave" onClick={props.onSave}>
        Save to spotify
      </button>
    </div>
  );
};

export default Playlist;
