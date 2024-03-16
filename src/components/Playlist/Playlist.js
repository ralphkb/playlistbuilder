import React, { useEffect, useState } from "react";
import "./Playlist.css";
import TrackList from "../Tracklist/Tracklist.js";
import Spotify from "../../utils/SpotifyAPI.js";

const Playlist = (props) => {
  const [playlists, setPlaylists] = useState([]);
  const [showEditButton, setShowEditButton] = useState(false);

  useEffect(() => {
    Spotify.fetchPlaylists().then((playlists) => {
      setPlaylists(playlists);
    });
  }, []);

  const handleNameChange = (event) => {
    props.onNameChange(event.target.value);
  };

  const handleTypeChange = (event) => {
    props.onTypeChange(event.target.value);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = playlists.find(
      (playlist) => playlist.name === selectedValue,
    );
    const selectedPlaylistId = selectedOption ? selectedOption.id : null;
    props.onPlaylistSelected(selectedPlaylistId);

    if (selectedValue === "New Playlist") {
      props.onTracksChange([]);
      const playlistNameInput = document.getElementById("playlistNameInput");
      if (playlistNameInput) {
        playlistNameInput.value = "Playlist Name";
      }
      handleTypeChange({ target: { value: "public" } });
      setShowEditButton(false);
    } else if (selectedOption && selectedOption.tracks.href) {
      Spotify.fetchTracksFromPlaylist(selectedPlaylistId)
        .then((data) => {
          props.onTracksChange(data);
          setShowEditButton(
            selectedPlaylistId !== null && selectedPlaylistId !== undefined,
          );
          // Update the input's default value and the select's value
          const playlistNameInput =
            document.getElementById("playlistNameInput");
          if (playlistNameInput) {
            playlistNameInput.value = selectedValue;
          }
          if (selectedOption.public) {
            handleTypeChange({ target: { value: "public" } });
          } else {
            handleTypeChange({ target: { value: "private" } });
          }
        })
        .catch((error) => {
          console.error("Error fetching tracks", error);
        });
    } else {
      console.error("Selected playlist or tracks href not found");
    }
  };

  return (
    <div className="Playlist">
      <div className="flex-row">
        <select id="playlists" onChange={handleSelectChange}>
          {playlists.map((playlist) => (
            <option key={playlist.id} value={playlist.name}>
              {playlist.name}
            </option>
          ))}
          <option value="New Playlist">New Playlist</option>
        </select>
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
      {showEditButton ? (
        <button className="PlaylistSave" onClick={props.onEdit}>
          Edit on Spotify
        </button>
      ) : (
        <button className="PlaylistSave" onClick={props.onSave}>
          Save to spotify
        </button>
      )}
    </div>
  );
};

export default Playlist;
