require("dotenv").config();
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
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
      res.sendStatus(error.statusCode);
    });
});

app.post("/refresh", (req, res) => {
  spotifyApi.setRefreshToken(req.body.refreshToken);

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((error) => {
      res.sendStatus(error.statusCode);
    });
});

app.get("/featured-playlists", (req, res) => {
  spotifyApi.clientCredentialsGrant().then(({ body: { access_token } }) => {
    spotifyApi.setAccessToken(access_token);

    spotifyApi
      .getFeaturedPlaylists({ limit: 6, locale: "en" })
      .then(({ body }) => {
        res.json({
          body,
        });
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(error.statusCode);
      });
  });
});

app.get("/playlist/:id", (req, res) => {
  spotifyApi.clientCredentialsGrant().then(({ body: { access_token } }) => {
    spotifyApi.setAccessToken(access_token);

    spotifyApi
      .getPlaylist(req.params.id, { locale: "en" })
      .then(({ body }) => {
        res.json({
          body,
        });
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(error.statusCode);
      });
  });
});

app.get("/categories", (req, res) => {
  spotifyApi.clientCredentialsGrant().then(({ body: { access_token } }) => {
    spotifyApi.setAccessToken(access_token);

    spotifyApi
      .getCategories({ locale: "en" })
      .then(({ body }) => {
        res.json({
          body,
        });
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(error.statusCode);
      });
  });
});

app.get("/categories/:id", (req, res) => {
  spotifyApi.clientCredentialsGrant().then(({ body: { access_token } }) => {
    spotifyApi.setAccessToken(access_token);

    spotifyApi
      .getCategory(req.params.id, { locale: "en" })
      .then(({ body }) => {
        res.json({
          body,
        });
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(error.statusCode);
      });
  });
});

app.get("/categories/:id/playlists", (req, res) => {
  spotifyApi.clientCredentialsGrant().then(({ body: { access_token } }) => {
    spotifyApi.setAccessToken(access_token);

    spotifyApi
      .getPlaylistsForCategory(req.params.id, { limit: 8, locale: "en" })
      .then(({ body }) => {
        res.json({
          body,
        });
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(error.statusCode);
      });
  });
});

app.get("/search", (req, res) => {
  spotifyApi.clientCredentialsGrant().then(({ body: { access_token } }) => {
    spotifyApi.setAccessToken(access_token);

    spotifyApi
      .search(req.query.query, req.query.types, {
        limit: req.query.limit,
        locale: "en",
      })
      .then(({ body }) => {
        res.json({
          body,
        });
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(error.statusCode);
      });
  });
});

app.listen(6969);
