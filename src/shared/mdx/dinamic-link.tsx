// components/DynamicLink.tsx
import Link from 'next/link';
import React from 'react';

interface DynamicLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string; // для дополнительной стилизации
}

const DynamicLink: React.FC<DynamicLinkProps> = ({ href, children, className }) => {
  return (
    <Link href={href} passHref>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default DynamicLink;
