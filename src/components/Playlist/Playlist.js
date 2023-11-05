import React from 'react';
import "./Playlist.css";
import TrackList from "../Tracklist/Tracklist.js";

const Playlist = (props) => {
  const handleNameChange = (event) => {
    props.onNameChange(event.target.value);
  };

  return (
    <div className="Playlist">
      <input id="playlistNameInput" name="playlistName" onChange={handleNameChange} defaultValue={"New Playlist"} />
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