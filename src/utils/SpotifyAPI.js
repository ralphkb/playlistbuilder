const clientId = '187bf9c3917e41e2949d107396d07a74'; // Insert client ID here.
const redirectUri = 'http://localhost:3000';
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
          // Clear access token after expiration time
          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          // Clear URL parameters to grab a new access token when it expires
          window.history.pushState('Access Token', null, '/');
          return accessToken;
        } else {
          // If access token is not found in URL, redirect to authorization URL
          const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
          window.location = accessUrl;
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
          return;
        }
      
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;
      
        try {
          const response = await fetch('https://api.spotify.com/v1/me', { headers });
          const jsonResponse = await response.json();
          userId = jsonResponse.id;
      
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
        } catch (error) {
          console.error(error);
        }
      }

};

export default Spotify;
