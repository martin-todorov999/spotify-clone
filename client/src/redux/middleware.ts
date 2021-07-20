import axios from "axios";
import { refreshAccessToken } from "./actions/session";

const handleRefreshToken = (store: any) => (next: any) => (action: any) => {
  const {
    session: { refreshToken, expiresIn, accessTokenTimestamp },
  } = store.getState();

  if (
    // Refreshes the token 5 minutes before it expires
    accessTokenTimestamp &&
    new Date().getTime() + 5 * 60 * 1000 >=
      accessTokenTimestamp + expiresIn * 1000
  ) {
    if (refreshToken) {
      axios
        .post("http://localhost:6969/refresh", {
          refreshToken,
        })
        .then((res) => {
          const timestamp = new Date().getTime();

          store.dispatch(
            refreshAccessToken(
              res.data.accessToken,
              res.data.expiresIn,
              timestamp
            )
          );
        });
    }
  }

  return next(action);
};

export default handleRefreshToken;
