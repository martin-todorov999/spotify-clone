interface IButtonProps {
  title: string;
  variant: "link" | "button";
  classes?: string;
  href?: string;
  onClick?: () => void;
}

const Button = ({ title, variant, classes, href, onClick }: IButtonProps) => {
  const isLink = variant === "link";

  const className = `font-bold tracking-widest uppercase py-3 px-8 rounded-3xl transition duration-150 ease-out ${
    classes && classes
  }`;

  return isLink ? (
    <a type="button" href={href} className={className}>
      {title}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {title}
    </button>
  );
};

export default Button;
