import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '@logos/logo.svg';
import { AspectRatio } from '../ui/aspect-ratio';

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link
      href={`${process.env.NEXTAUTH_URL}`}
      prefetch={false}
      className="flex items-center cursor-pointer"
    >
      <div className="flex items-center w-36 h-5 lg:w-48 lg:h-6 xl:w-72 xl:h-14">
        <Image
          priority
          src={logo}
          alt="TC Blinks Logo"
          className="dark:filter dark:invert"
        />
      </div>
    </Link>
  );
};

export default Logo;
