import ContentSection from "../../components/generic/content-section/content-section";

const HomePage = () => {
  return (
    <>
      <ContentSection title="Spotify Playlists" />

      <ContentSection
        title="Suggested artists"
        subtitle="Inspired by your recent listening activity"
      />
    </>
  );
};

export default HomePage;
