import { Fragment } from "react";

interface IHighlightCardProps {
  title: string;
  subtitle: string;
  savedItems?:
    | SpotifyApi.UsersSavedTracksResponse
    | SpotifyApi.UsersSavedEpisodesResponse;
  colors: {
    from: string;
    via: string;
    to: string;
  };
}

// bg-gradient-to-br from-blue-900 via-purple-700 to-blue-300

const HighlightCard = ({
  title,
  subtitle,
  savedItems,
  colors: { from, via, to },
}: IHighlightCardProps) => {
  return (
    <div
      className={`bg-gradient-to-br ${from} ${via} ${to} w-full md:w-94 p-4 rounded flex flex-col flex-col-reverse text-white`}
    >
      <div>
        <h1 className="text-3xl font-bold capitalize">{title}</h1>
        <h3 className="text-md font-normal">{`${savedItems?.total} ${subtitle}`}</h3>
      </div>

      <div className="mb-8 h-20 py-2 overflow-hidden line-clamp-3">
        {savedItems?.items.map((item) => (
          <Fragment key={item.added_at}>
            {"episode" in item ? (
              <>
                <h3 className="text-md inline align-middle">
                  {item.episode.name}
                </h3>
                <h3 className="text-gray-300 text-md ml-1 inline align-middle">
                  {item.episode.show.name}
                </h3>
                <h3 className="text-gray-300 mx-1 inline align-middle">
                  &bull;
                </h3>
              </>
            ) : (
              <>
                <h3 className="text-md inline align-middle">
                  {item.track.artists[0].name}
                </h3>
                <h3 className="text-gray-300 text-md ml-1 inline align-middle">
                  {item.track.name}
                </h3>
                <h3 className="text-gray-300 mx-1 inline align-middle">
                  &bull;
                </h3>
              </>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default HighlightCard;
