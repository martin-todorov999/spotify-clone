import { useEffect, useState } from "react";
import { usePalette } from "react-palette";
import useContrastText from "../../hooks/utils/useContrastText";
import { useSortImages } from "../../hooks/utils/useSortImages";

interface IGenreCardProps {
  artistAndGenre: { artist: SpotifyApi.ArtistObjectFull; genre: string };
}

const GenreCard = ({ artistAndGenre: { artist, genre } }: IGenreCardProps) => {
  const image = useSortImages(artist.images)[0];
  const [primaryColor, setPrimaryColor] = useState<string>("");
  const { data } = usePalette(image.url);
  const textPrimary = useContrastText(primaryColor)
    ? "text-gray-900"
    : "text-white";

  useEffect(() => {
    if (data.darkVibrant) {
      setPrimaryColor(data.darkVibrant);
    }
  }, [data]);

  return (
    <div
      style={{ background: primaryColor }}
      className={`w-full ${textPrimary} rounded h-52 p-6 pr-16 relative overflow-hidden shadow-md`}
    >
      <h1 className="text-white font-bold text-5xl capitalize line-clamp-3 tracking-tight">
        {genre}
      </h1>
      <img
        src={image.url}
        alt="artist"
        className="absolute -right-2 -bottom-2 h-24 w-24 shadow-lg rounded transform rotate-12"
      />
    </div>
  );
};

export default GenreCard;
