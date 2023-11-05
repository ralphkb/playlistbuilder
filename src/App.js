import React, { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header/Header.js";
import Playlist from "./components/Playlist/Playlist.js";
import SearchBar from "./components/SearchBar/SearchBar.js";
import SearchResults from "./components/SearchResults/SearchResults.js";
import Spotify from "./utils/SpotifyAPI.js";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  const search = (term) => {
    Spotify.search(term).then((results) => {
      const filteredResults = results.filter((result) => {
        return !playlistTracks.some((playlistTrack) => playlistTrack.id === result.id);
      });
      setSearchResults(filteredResults);
    });
  };

  const addTrack = (track) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
  
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    setSearchResults((prevResults) =>
      prevResults.filter((result) => result.id !== track.id)
    );
  };
  
  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
    setSearchResults((prevResults) => [track, ...prevResults]);
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  };

  return (
    <div>
      <Header />
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
