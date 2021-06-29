import ContentCard from "../content-card/content-card";

interface IContentSectionProps {
  title: string;
  subtitle: string;
}

const ContentSection = ({ title, subtitle }: IContentSectionProps) => {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <h1 className="text-white">{title}</h1>
        <h3 className="text-gray-400">{subtitle}</h3>
      </div>

      <div className="grid grid-cols-auto-fit gap-10">
        <ContentCard title="Toshiba" subtitle="Artist" />
        <ContentCard title="Toshiba" subtitle="Artist" />
        <ContentCard title="Toshiba" subtitle="Artist" />
        <ContentCard title="Toshiba" subtitle="Artist" />
        <ContentCard title="Toshiba" subtitle="Artist" />
        <ContentCard title="Toshiba" subtitle="Artist" />
      </div>
    </div>
  );
};

export default ContentSection;
