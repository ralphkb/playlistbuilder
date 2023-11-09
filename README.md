# Playlist Builder React Application

## Introduction
Playlist Builder is a React Web Application that allows users to customize and add playlists to their Spotify account. Using the Spotify API, this application enables users to authenticate their account then search for songs, albums and artists. The results of the search will be displayed with a preview image, the artist name, song name and album name. The user can easily add or remove any tracks by using the given buttons on the right of each track. Once the user is done creating their new playlist, they can give it a custom name and save it to their Spotify account.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents
- [🛠️ Installation](#installation)
- [✨ Features](#features)
- [📃 License](#license)

## Installation
1. Install Node.js if not already installed: [Node.js Installation Guide](https://nodejs.org/en/download/)
2. Clone the repository: `git clone https://github.com/ralphkb/playlistbuilder.git`
3. Navigate to the project directory, for example: `cd playlistbuilder`
4. Run `npm install` to install the dependencies.
5. Open `src/utils/SpotifyAPI.js` and change the redirectUri to "http://localhost:3000"
6. Start the server by running `npm start`
7. Open `http://localhost:3000` in your browser, you will need to sign in to your Spotify account and authorize access.
8. When done using the application, you can close it by pressing `Ctrl + C` in the terminal and closing your browser.

## Features
- **Spotify Login**: Spotify will you to log in or set up a new account, to integrate with this App and start the process of creating new playlists.
- **Multiple Search Options**: Search by Song, Album or Artist by typing it in the search bar then either pressing the enter key or clicking the search button.
- **Add Songs to the Custom Playlist**: Add tracks to the playlist by clicking on the `+` button.
- **Remove Songs from the Custom Playlist**: Remove tracks from the playlist by clicking on the `-` button.
- **Change Playlist Title**: By default the title is "New Playlist" in the input bar but you can change it to any name you want.
- **Save The Playlist**: Save your Custom playlist to your Spotify account and enjoy it on all your devices.

## License
This project is licensed under the [MIT License](LICENSE).