import ContentCard from "../content-card/content-card";

interface IContentSectionProps {
  title: string;
  subtitle?: string;
}

const ContentSection = ({ title, subtitle }: IContentSectionProps) => {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <h1 className="text-white text-2xl font-medium">{title}</h1>
        {subtitle && <h3 className="text-gray-400">{subtitle}</h3>}
      </div>

      <div className="grid grid-cols-auto-fit gap-10">
        {/* <ContentCard title="First Last" subtitle="Artist" variant="artist" />
        <ContentCard title="First Last" subtitle="Artist" variant="artist" />
        <ContentCard title="First Last" subtitle="Artist" variant="artist" />

        <ContentCard title="Playlist Name" subtitle="Playlist description" />
        <ContentCard title="Playlist Name" subtitle="Playlist description" />
        <ContentCard title="Playlist Name" subtitle="Playlist description" />

        <ContentCard
          title="Podcast Name"
          subtitle="Podcast Description"
          variant="podcast"
        />
        <ContentCard
          title="Podcast Name"
          subtitle="Podcast Description"
          variant="podcast"
        />
        <ContentCard
          title="Podcast Name"
          subtitle="Podcast Description"
          variant="podcast"
        /> */}
      </div>
    </div>
  );
};

export default ContentSection;
