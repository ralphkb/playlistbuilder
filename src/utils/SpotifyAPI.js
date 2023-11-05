const clientId = '187bf9c3917e41e2949d107396d07a74'; // Insert client ID here.
const redirectUri = 'https://playlistbuilder.netlify.app/';
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
          localStorage.setItem('spotifyAccessToken', accessToken);
          localStorage.setItem('spotifyTokenExpiration', expirationTime);
          // Clear URL parameters to grab a new access token when it expires
          window.history.pushState('Access Token', null, '/');
          return accessToken;
        } else {
          // If access token is not found in URL, check if it is stored in local storage
          const storedAccessToken = localStorage.getItem('spotifyAccessToken');
          const storedExpirationTime = localStorage.getItem('spotifyTokenExpiration');
          // If stored access token and expiration time exist and the expiration time has not passed
          if (storedAccessToken && storedExpirationTime && Date.now() < storedExpirationTime) {
              accessToken = storedAccessToken;
              return accessToken;
          } else {
              // If access token is not found in URL or local storage, redirect to authorization URL
              const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
              window.location = accessUrl;
          }
        }
      },

      async search(term) {
        try {
          const accessToken = Spotify.getAccessToken();
          const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          const jsonResponse = await response.json();
    
          if (!jsonResponse.tracks) {
            return [];
          }
          
          return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            image: track.album.images[0].url
          }));
        } catch (error) {
          console.error(error);
          throw error;
        }
      },

      async savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
          if (!name && !trackUris.length) {
            window.alert("Please enter a playlist name and add songs to the playlist before saving it.");
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
          const response = await fetch('https://api.spotify.com/v1/me', { headers });
          const jsonResponse = await response.json();
          userId = jsonResponse.id;

          // Show loading screen
          document.getElementById('loading-screen').style.display = 'flex';
      
          const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers,
            method: 'POST',
            body: JSON.stringify({ name })
          });
          const playlistJsonResponse = await playlistResponse.json();
          const playlistId = playlistJsonResponse.id;
      
          await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers,
            method: 'POST',
            body: JSON.stringify({ uris: trackUris })
          });

          // Hide loading screen
          document.getElementById('loading-screen').style.display = 'none';

          // Alert the user that the playlist has been created successfully
          alert(`A new playlist with the name: ${name} has been created successfully!`);
        } catch (error) {
          console.error(error);
        }
      }

};

export default Spotify;
