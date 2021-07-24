import { History } from "history";

const handleRedirectClick = (
  id: string,
  route: "playlist" | "album" | "category",
  history: History
) => {
  history.push(`/${route}/${id}`);
};

export default handleRedirectClick;
