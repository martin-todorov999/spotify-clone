import SpotifyWebApi from "spotify-web-api-node";

export const authUrl =
  "https://accounts.spotify.com/authorize?client_id=d1b6a57fb43949f5b15ff1f50e47e764&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-library-read%20user-library-modify%20user-top-read%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20user-read-recently-played";

const spotifyApi = new SpotifyWebApi({
  clientId: "d1b6a57fb43949f5b15ff1f50e47e764",
});

export default spotifyApi;
