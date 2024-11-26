# Playlist Builder React Application

## Introduction
Playlist Builder is a React Web Application that allows users to customize and add playlists to their Spotify account. Using the Spotify API, this application enables users to authenticate their account then search for songs, albums and artists. The results of the search will be displayed with a preview image, the artist name, song name, album name and track length. The user can easily add or remove any tracks by using the given buttons on the right of each track. Once the user is done creating their new playlist or modifying an existing one, they can give it a custom name, make it private or public and save it to their Spotify account.

## Table of Contents
- [🛠️ Installation](#installation)
- [✨ Features](#features)
- [📃 License](#license)

## Installation
1. Install Node.js if not already installed: [Node.js Installation Guide](https://nodejs.org/en/download/)
2. Clone the repository: `git clone https://github.com/ralphkb/playlistbuilder.git`
3. Navigate to the project directory, for example: `cd playlistbuilder`
4. Run `npm install` to install the dependencies.
5. Create [an app](https://developer.spotify.com/documentation/web-api/concepts/apps) on the spotify developer dashboard, copy the client ID and add http://localhost:1234 in the `Redirect URIs` of your app's settings.
6. Rename `.env.example` to `.env` and paste your app's client ID in it alongside adding "http://localhost:1234" as the `REDIRECT_URI`.
7. Start the server by running `npm start`
8. Open `http://localhost:1234` in your browser, you will need to sign in to your Spotify account and authorize access.
9. When done using the application, you can close it by pressing `Ctrl + C` in the terminal and closing your browser.

## Features
- **Spotify Login**: Spotify will ask you to log in or set up a new account, to integrate with this App and start the process of creating new playlists.
- **Multiple Search Options**: Search by Song, Album or Artist by typing it in the search bar then either pressing the enter key or clicking the search button.
- **Add Songs to the Custom Playlist**: Add tracks to the playlist by clicking on the `+` button.
- **Remove Songs from the Custom Playlist**: Remove tracks from the playlist by clicking on the `-` button.
- **Change Playlist Title**: By default the title is "New Playlist" in the input bar but you can change it to any name you want.
- **Change Playlist Type**: You can change the playlist type between public and private.
- **Save The Playlist**: Save your Custom playlist to your Spotify account and enjoy it on all your devices.
- **Edit Other Playlists**: You can select any of your current Spotify playlists and edit them by removing or adding songs then clicking the edit button to save the changes.

## License
This project is licensed under the [MIT License](LICENSE).