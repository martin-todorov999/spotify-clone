import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const useAuth = (code: string | null) => {
  const history = useHistory();
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [expiresIn, setExpiresIn] = useState<number>();

  useEffect(() => {
    if (code) {
      axios
        .post("http://localhost:6969/login", {
          code,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);

          history.push("/");
        })
        .catch(() => {
          history.push("/signin");
        });
    }
  }, [code, history]);

  useEffect(() => {
    if (refreshToken && expiresIn) {
      const interval = setInterval(() => {
        axios
          .post("http://localhost:6969/refresh", {
            refreshToken,
          })
          .then((res) => {
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
          })
          .catch(() => {
            history.push("/signin");
          });
      }, (expiresIn - 60) * 1000);

      return () => clearInterval(interval);
    }
  }, [refreshToken, expiresIn, history]);

  return accessToken;
};

export default useAuth;
