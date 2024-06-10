import React, { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header/Header.js";
import Playlist from "./components/Playlist/Playlist.js";
import SearchResults from "./components/SearchResults/SearchResults.js";
import Spotify from "./utils/SpotifyAPI.js";

const defaultTracks = [
  {
    name: "Blank Space",
    artist: "Taylor Swift",
    album: "1989 (Deluxe)",
    image: "https://i.scdn.co/image/ab67616d0000b27352b2a3824413eefe9e33817a",
    id: "1u8c2t2Cy7UBoG4ArRcF5g",
    uri: "spotify:track:1u8c2t2Cy7UBoG4ArRcF5g",
    length: 232000,
  },
  {
    name: "Into You",
    artist: "Ariana Grande",
    album: "Dangerous Woman",
    image: "https://i.scdn.co/image/ab67616d0000b27333342c57a9b2c4e04c97b3f5",
    id: "76FZM38RC8XaAjJ77CVTNe",
    uri: "spotify:track:76FZM38RC8XaAjJ77CVTNe",
    length: 244000,
  },
  {
    name: "Fearless Pt. II",
    artist: "Lost Sky",
    album: "Fearless Pt. II",
    image: "https://i.scdn.co/image/ab67616d0000b273df7c14e866cf14a259563ca1",
    id: "4y1nvncvBhdoelqPMyXxis",
    uri: "spotify:track:4y1nvncvBhdoelqPMyXxis",
    length: 194000,
  },
  {
    name: "Lily",
    artist: "Alan Walker",
    album: "Different World",
    image: "https://i.scdn.co/image/ab67616d0000b273a108e07c661f9fc54de9c43a",
    id: "0lks2Kt9veMOFEAPN0fsqN",
    uri: "spotify:track:0lks2Kt9veMOFEAPN0fsqN",
    length: 195840,
  },
];

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("Playlist Name");
  const [playlistType, setPlaylistType] = useState("public");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (initialLoad) {
    const savedPlaylistTracks = JSON.parse(
      localStorage.getItem("playlistTracks"),
    );

    if (savedPlaylistTracks) {
      setPlaylistTracks(savedPlaylistTracks);

      const filteredDefaultTracks = defaultTracks.filter((defaultTrack) => {
        return !savedPlaylistTracks.some(
          (track) => track.id === defaultTrack.id,
        );
      });

      setSearchResults(filteredDefaultTracks);
    }

    setInitialLoad(false);
  }

  useEffect(() => {
    localStorage.setItem("playlistTracks", JSON.stringify(playlistTracks));
  }, [playlistTracks]);

  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  const search = (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      const filteredDefaultTracks = defaultTracks.filter((defaultTrack) => {
        return !playlistTracks.some((track) => track.id === defaultTrack.id);
      });
      setSearchResults(filteredDefaultTracks);
    } else {
      Spotify.search(term).then((results) => {
        const filteredResults = results.filter((result) => {
          return !playlistTracks.some(
            (playlistTrack) => playlistTrack.id === result.id,
          );
        });
        setSearchResults(filteredResults);
      });
    }
  };

  const addTrack = (track) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
      return;
    }

    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    setSearchResults((prevResults) =>
      prevResults.filter((result) => result.id !== track.id),
    );
  };

  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id),
    );
    const searchTermRegex = new RegExp(`\\b${searchTerm.toLowerCase()}\\b`);
    if (
      !searchResults.some((result) => result.id === track.id) &&
      searchTerm.trim() !== "" &&
      searchTermRegex.test(track.name.toLowerCase())
    ) {
      setSearchResults((prevResults) => [track, ...prevResults]);
    }
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const updatePlaylistType = (type) => {
    setPlaylistType(type);
  };

  const savePlaylist = () => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, playlistType, trackUris).then(() => {
      setPlaylistName("Playlist Name");
      setPlaylistType("public");
      setPlaylistTracks([]);
    });
  };

  const editPlaylist = () => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.editPlaylist(
      selectedPlaylistId,
      playlistName,
      playlistType,
      trackUris,
    ).then(() => {
      setPlaylistName("Playlist Name");
      setPlaylistType("public");
      setPlaylistTracks([]);
    });
  };

  const handlePlaylistSelected = (playlistId) => {
    setSelectedPlaylistId(playlistId);
  };

  const handleTracksChange = (newTracks) => {
    setPlaylistTracks(newTracks);
  };

  return (
    <>
      <Header />
      <div className="App">
        <div className="flex-container">
          <div className="flex-item">
            <SearchResults
              searchResults={searchResults}
              onAdd={addTrack}
              onSearch={search}
            />
          </div>
          <div className="flex-item" id="playlistFlex">
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onNameChange={updatePlaylistName}
              playlistType={playlistType}
              onTypeChange={updatePlaylistType}
              onRemove={removeTrack}
              onSave={savePlaylist}
              onEdit={editPlaylist}
              onPlaylistSelected={handlePlaylistSelected}
              onTracksChange={handleTracksChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
