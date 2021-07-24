import axios from "axios";
import { refreshAccessToken } from "./actions/session";

// Refreshes the token 5 minutes before it expires
const handleRefreshToken = (store: any) => (next: any) => (action: any) => {
  const {
    session: { refreshToken, expiresIn, accessTokenTimestamp },
  } = store.getState();

  if (
    accessTokenTimestamp &&
    new Date().getTime() + 5 * 60 * 1000 >=
      accessTokenTimestamp + expiresIn * 1000
  ) {
    if (refreshToken) {
      axios
        .post("http://localhost:6969/refresh", {
          refreshToken,
        })
        .then(({ data }) => {
          const timestamp = new Date().getTime();

          store.dispatch(
            refreshAccessToken(data.accessToken, data.expiresIn, timestamp)
          );
        });
    }
  }

  return next(action);
};

export default handleRefreshToken;
