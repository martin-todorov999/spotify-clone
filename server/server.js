const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const spotifyApi = new SpotifyWebApi({
  redirectUri: "http://localhost:3000",
  clientId: "d1b6a57fb43949f5b15ff1f50e47e764",
  clientSecret: "7e7a1006098d49b9b20f5d47edbf184b",
});

app.post("/login", (req, res) => {
  const code = req.body.code;

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((error) => {
      res.sendStatus(400);
    });
});

app.post("/refresh", (req, res) => {
  spotifyApi.setRefreshToken(req.body.refreshToken);

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((error) => {
      res.sendStatus(400);
    });
});

app.listen(6969);
