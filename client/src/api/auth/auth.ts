export const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=d1b6a57fb43949f5b15ff1f50e47e764&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export const signIn = () => {
  return AUTH_URL;
};

export interface Temp {
  name: string;
}
