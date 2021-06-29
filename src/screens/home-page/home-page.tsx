import ContentSection from "../../components/generic/content-section/content-section";

const HomePage = () => {
  return (
    <>
      <ContentSection
        title="Maznichko za teb"
        subtitle="Kolkoto po-maznichko tolko po-dobre"
      />

      <ContentSection
        title="Suggested artists"
        subtitle="Inspired by your recent listening activity"
      />
    </>
  );
};

export default HomePage;
