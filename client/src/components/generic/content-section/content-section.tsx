interface IContentSectionProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const ContentSection = ({
  title,
  subtitle,
  children,
}: IContentSectionProps) => {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <h1 className="text-white text-2xl font-bold">{title}</h1>
        {subtitle && <h3 className="text-gray-400">{subtitle}</h3>}
      </div>

      <div className="grid grid-cols-auto-fit gap-6">{children}</div>
    </div>
  );
};

export default ContentSection;
