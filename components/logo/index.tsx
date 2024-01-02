import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '@logos/logo.svg';
import { AspectRatio } from '../ui/aspect-ratio';

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link
      href="/"
      prefetch={false}
      className="flex items-center cursor-pointer"
    >
      <div className="flex items-center w-72 h-14">
        <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center"
        >
          <Image
            priority
            src={logo}
            alt="TC Blinks Logo"
            className="dark: filter dark:invert"
          />
        </AspectRatio>
      </div>
    </Link>
  );
};

export default Logo;
