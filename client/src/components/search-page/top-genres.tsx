import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import spotifyApi from "../../api";
import { RootState } from "../../redux/reducers";
import ContentSection from "../generic/content-section/content-section";
import GenreCard from "./genre-card";

const TopGenres = () => {
  const { accessToken } = useSelector((state: RootState) => state.session);
  const [topArtists, setTopArtists] =
    useState<SpotifyApi.UsersTopArtistsResponse>();
  const [topGenres, setTopGenres] = useState<string[]>([]);
  const [topArtistAndGenre, setTopArtistAndGenre] = useState<
    { artist: SpotifyApi.ArtistObjectFull; genre: string }[]
  >([]);

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.getMyTopArtists().then(({ body }) => setTopArtists(body));
    }
  }, [accessToken]);

  const sortByFrequency = (arr: string[]) => {
    const frequencyMap = arr.reduce(
      (obj: { [key: string]: number }, item: string) => {
        const newObj = obj;
        newObj[item] = (newObj[item] || 0) + 1;

        return newObj;
      },
      {}
    );

    const sorted = Object.entries(frequencyMap)
      .sort((a, b) => b[1] - a[1])
      .flatMap((array) => Array(array[1]).fill(array[0]));

    return sorted.filter((genre, index) => sorted.indexOf(genre) === index);
  };

  useEffect(() => {
    let genres: string[] = [];

    topArtists?.items.forEach((artist) => {
      genres = [...genres, ...artist.genres];
    });

    genres = sortByFrequency(genres);

    setTopGenres(
      genres
        .filter((genre, index) => genres.indexOf(genre) === index)
        .slice(0, 3)
    );
  }, [topArtists]);

  useEffect(() => {
    topGenres.forEach((topGenre: string) => {
      const topArtist = topArtists?.items.find(
        (artist: SpotifyApi.ArtistObjectFull) => {
          return artist.genres.find((genre: string) => genre === topGenre);
        }
      );

      if (topArtist)
        setTopArtistAndGenre((previousState) => [
          ...previousState,
          { artist: topArtist, genre: topGenre },
        ]);
    });
  }, [topGenres, topArtists]);

  return (
    <ContentSection
      title="Your top genres"
      childrenContainerClasses="flex flex-wrap lg:flex-nowrap gap-6 flex-row items-center justify-between"
    >
      {topArtistAndGenre.map((artistAndGenre) => (
        <GenreCard key={artistAndGenre.genre} artistAndGenre={artistAndGenre} />
      ))}
    </ContentSection>
  );
};

export default TopGenres;
