import { NavLink } from "react-router-dom";

const LibraryMenu = () => {
  return (
    <div className="md:ml-8 flex flex-row gap-2 items-center justify-start">
      <NavLink
        exact
        to="/collection/playlists"
        activeClassName="bg-gray-700"
        className="text-white flex items-center justify-center rounded cursor-pointer py-3 px-4"
      >
        <h3 className="text-sm font-bold">Playlists</h3>
      </NavLink>

      <NavLink
        exact
        to="/collection/podcasts"
        activeClassName="bg-gray-700"
        className="text-white flex items-center justify-center rounded cursor-pointer py-3 px-4"
      >
        <h3 className="text-sm font-bold">Podcasts</h3>
      </NavLink>

      <NavLink
        exact
        to="/collection/artists"
        activeClassName="bg-gray-700"
        className="text-white flex items-center justify-center rounded cursor-pointer py-3 px-4"
      >
        <h3 className="text-sm font-bold">Artists</h3>
      </NavLink>

      <NavLink
        exact
        to="/collection/albums"
        activeClassName="bg-gray-700"
        className="text-white flex items-center justify-center rounded cursor-pointer py-3 px-4"
      >
        <h3 className="text-sm font-bold">Albums</h3>
      </NavLink>
    </div>
  );
};

export default LibraryMenu;
