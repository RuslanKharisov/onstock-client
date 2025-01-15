import { FC } from "react";

export interface SocialsData {
  icon: FC<{ size?: string }>; // Type for the icon as a functional component
  link: string;
  label: string;
}

interface SocialsProps {
  size?: string;
  socialsData: SocialsData[];
}

const Socials: FC<SocialsProps> = ({ size, socialsData }) => {
  return (
    <div className="flex gap-3">
      {socialsData.map(({ icon: Icon, link, label }, index) => (
        <a
          key={index}
          href={link}
          className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground"
          aria-label={label}
        >
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
};

export {Socials}
