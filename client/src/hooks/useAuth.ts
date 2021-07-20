import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import spotifyApi from "../api";
import { logIn, refreshAccessToken, setUser } from "../redux/actions/session";

const useAuth = (code: string | null) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [expiresIn, setExpiresIn] = useState<number>();
  const [accessTokenTimestamp, setAccessTokenTimestamp] = useState<number>();

  useEffect(() => {
    if (code) {
      axios
        .post("http://localhost:6969/login", {
          code,
        })
        .then(({ data }) => {
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          setExpiresIn(data.expiresIn);

          if (data.accessToken && data.refreshToken && data.expiresIn) {
            const timestamp = new Date().getTime();
            setAccessTokenTimestamp(timestamp);

            dispatch(
              logIn(
                data.accessToken,
                data.refreshToken,
                data.expiresIn,
                timestamp
              )
            );

            spotifyApi.setAccessToken(data.accessToken);

            spotifyApi.getMe().then(({ body }) => {
              dispatch(setUser(body));
            });
          }

          history.push("/");
        })
        .catch(() => {
          history.push("/");
        });
    }
    // eslint-disable-next-line
  }, [code]);

  useEffect(() => {
    if (refreshToken && expiresIn) {
      const interval = setInterval(() => {
        axios
          .post("http://localhost:6969/refresh", {
            refreshToken,
          })
          .then(({ data }) => {
            setAccessToken(data.accessToken);
            setExpiresIn(data.expiresIn);

            if (data.accessToken && data.refreshToken && data.expiresIn) {
              const timestamp = new Date().getTime();
              setAccessTokenTimestamp(timestamp);

              dispatch(
                refreshAccessToken(data.accessToken, data.expiresIn, timestamp)
              );
            }
          })
          .catch(() => {
            history.push("/");
          });
      }, (expiresIn - 60 * 5) * 1000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  }, [refreshToken, expiresIn]);

  return { accessToken, refreshToken, expiresIn, accessTokenTimestamp };
};

export default useAuth;
