import React, { useEffect, useState } from "react";
import "./Playlist.css";
import TrackList from "../Tracklist/Tracklist.js";
import Spotify from "../../utils/SpotifyAPI.js";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";

const Playlist = (props) => {
  const [playlists, setPlaylists] = useState([]);
  const [showEditButton, setShowEditButton] = useState(false);
  const [selection, setSelection] = useState("New Playlist");

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
    setSelection(selectedValue);
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
        minHeight: "695.815px",
        padding: "20px",
        backgroundColor: "#1db954",
        borderRadius: "10px",
        border: "2px solid #000",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        "&::before": {
          content: '"Playlist Customization"',
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
      <div className="flex-row">
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <Select
            className="playlistInputs"
            id="playlists"
            onChange={handleSelectChange}
            value={selection}
            autoWidth
            aria-label="Playlist Option"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#121212",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            }}
          >
            {playlists.map((playlist) => (
              <MenuItem key={playlist.id} value={playlist.name}>
                {playlist.name}
              </MenuItem>
            ))}
            <MenuItem value="New Playlist">New Playlist</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <TextField
            className="playlistInputs"
            id="playlistNameInput"
            name="playlistName"
            type="text"
            placeholder="Playlist Name"
            defaultValue="Playlist Name"
            onChange={handleNameChange}
            inputProps={{ "aria-label": "playlist name" }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#121212",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <Select
            className="playlistInputs"
            id="playlist-type"
            value={props.playlistType}
            onChange={handleTypeChange}
            aria-label="Playlist Type Option"
            autoWidth
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#121212",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            }}
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TrackList
        tracks={props.playlistTracks}
        isRemoval={true}
        onRemove={props.onRemove}
      />
      {showEditButton ? (
        <Button
          className="PlaylistSave"
          onClick={props.onEdit}
          variant="contained"
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      ) : (
        <Button
          className="PlaylistSave"
          onClick={props.onSave}
          variant="contained"
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      )}
    </Box>
  );
};

export default Playlist;
