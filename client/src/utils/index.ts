import { History } from "history";

export const handleRedirectClick = (
  id: string,
  route: "playlist" | "album" | "category",
  history: History
) => {
  history.push(`/${route}/${id}`);
};

export const regexPathname = (pathname: string) => {
  return pathname.replace(/^\/([^/]*).*$/, "$1");
};
