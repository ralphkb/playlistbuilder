const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = "https://playlistbuilder.netlify.app/";
let accessToken;

const Spotify = {
  getAccessToken() {
    // Check if access token already exists
    if (accessToken) {
      return accessToken;
    }

    // Extract access token and expiration time from URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    // If access token and expiration time are found in URL
    if (accessTokenMatch && expiresInMatch) {
      // Store access token
      accessToken = accessTokenMatch[1];
      // Convert expiration time to number
      const expiresIn = Number(expiresInMatch[1]);
      // Calculate the expiration time
      const expirationTime = Date.now() + expiresIn * 1000;
      // Store the access token and expiration time in local storage
      localStorage.setItem("spotifyAccessToken", accessToken);
      localStorage.setItem("spotifyTokenExpiration", expirationTime);
      // Clear URL parameters to grab a new access token when it expires
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      // If access token is not found in URL, check if it is stored in local storage
      const storedAccessToken = localStorage.getItem("spotifyAccessToken");
      const storedExpirationTime = localStorage.getItem(
        "spotifyTokenExpiration",
      );
      // If stored access token and expiration time exist and the expiration time has not passed
      if (
        storedAccessToken &&
        storedExpirationTime &&
        Date.now() < storedExpirationTime
      ) {
        accessToken = storedAccessToken;
        return accessToken;
      } else {
        // If access token is not found in URL or local storage, redirect to authorization URL
        const scopes = [
          "playlist-modify-public",
          "playlist-modify-private",
          "playlist-read-private",
        ].join("%20");
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${redirectUri}`;
        window.location = accessUrl;
      }
    }
  },

  async search(term) {
    try {
      const accessToken = Spotify.getAccessToken();
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const jsonResponse = await response.json();

      if (!jsonResponse.tracks) {
        return [];
      }

      return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        image: track.album.images[0].url,
        length: track.duration_ms,
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async savePlaylist(name, playlistType, trackUris) {
    if (!name || !trackUris.length) {
      if (!name && !trackUris.length) {
        window.alert(
          "Please enter a playlist name and add songs to the playlist before saving it.",
        );
      } else if (!name) {
        window.alert("Please enter a playlist name.");
      } else {
        window.alert("Please add songs to the playlist before saving it.");
      }
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers,
      });
      const jsonResponse = await response.json();
      userId = jsonResponse.id;

      // Show loading screen
      document.getElementById("loading-screen").style.display = "flex";

      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers,
          method: "POST",
          body: JSON.stringify({
            name,
            public: playlistType === "public" ? true : false,
          }),
        },
      );
      const playlistJsonResponse = await playlistResponse.json();
      const playlistId = playlistJsonResponse.id;

      await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
        {
          headers,
          method: "POST",
          body: JSON.stringify({ uris: trackUris }),
        },
      );

      // Hide loading screen
      document.getElementById("loading-screen").style.display = "none";

      // Alert the user that the playlist has been created successfully
      alert(
        `A new ${playlistType} playlist with the name: ${name} has been created successfully!`,
      );
    } catch (error) {
      console.error(error);
    }
  },

  async fetchPlaylists() {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = await response.json();
    const currentUserDisplayName = userData.display_name;

    const playlistsResponse = await fetch(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const playlistsData = await playlistsResponse.json();

    // Filter playlists to only include those owned by the current user
    const userPlaylists = playlistsData.items.filter(
      (playlist) => playlist.owner.display_name === currentUserDisplayName,
    );
    return userPlaylists;
  },

  async editPlaylist(playlistId, name, playlistType, trackUris) {
    if (!name || !trackUris.length) {
      if (!name && !trackUris.length) {
        window.alert(
          "Please enter a playlist name and add songs to the playlist before saving it.",
        );
      } else if (!name) {
        window.alert("Please enter a playlist name.");
      } else {
        window.alert("Please add songs to the playlist before saving it.");
      }
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    try {
      // Show loading screen
      document.getElementById("loading-screen").style.display = "flex";

      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          name,
          public: playlistType === "public" ? true : false,
        }),
      });

      // Replace the playlist's tracks with the new list
      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ uris: trackUris }),
      });

      // Hide loading screen
      document.getElementById("loading-screen").style.display = "none";

      // Alert the user that the playlist has been updated successfully
      alert(`Your playlist has been updated successfully!`);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchTracksFromPlaylist(playlistID) {
    const accessToken = Spotify.getAccessToken();
    const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.items.map((item) => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        uri: item.track.uri,
        image: item.track.album.images[0].url,
        length: item.track.duration_ms,
        addedAt: item.added_at,
      }));
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  },
};

export default Spotify;
