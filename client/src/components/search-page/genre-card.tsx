interface IGenreCardProps {
  artistAndGenre: { artist: SpotifyApi.ArtistObjectFull; genre: string };
}

const GenreCard = ({ artistAndGenre: { artist, genre } }: IGenreCardProps) => {
  return (
    <div className={`${"bg-blue-400"} w-full rounded h-52 p-6 pr-16`}>
      <h1 className="text-white font-bold text-5xl capitalize line-clamp-3 tracking-tight">
        {genre}
      </h1>
    </div>
  );
};

export default GenreCard;
