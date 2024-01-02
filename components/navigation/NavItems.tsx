'use client';

import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import Link from 'next/link';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';
import { navOptions } from '@/utils';

type Props = { isMobileView?: boolean };

const NavItems = ({ isMobileView = false }: Props) => {
  return (
    <div className="hidden md:flex items-center justify-between w-full md:w-auto">
      <NavigationMenu>
        <NavigationMenuList className="text-xs lg:text-sm">
          {navOptions.map((item) => (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex space-x-12 bg-white dark:bg-gray-900 md:w-[450px] lg:w-[600px] p-4">
                  <div>
                    <Image
                      src={item.image}
                      alt={`TC Blinks ${item.id} fashion`}
                      width={`${item.imageWidth}`}
                      height={`${item.imageHeight}`}
                      priority
                      className="w-auto h-auto"
                    />
                  </div>

                  <div className="flex mt-3 text-gray-900 space-x-6 dark:text-white">
                    <div className="flex flex-col space-y-3 align-baseline">
                      <p className="font-semibold text-lg">Clothing</p>

                      {item.clothing.map((link) => (
                        <Link
                          href={`/${item.id}-clothing/${link.toLowerCase()}`}
                          legacyBehavior
                          passHref
                          key={link}
                        >
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            {link}
                          </NavigationMenuLink>
                        </Link>
                      ))}
                    </div>
                    <div className="flex flex-col space-y-3 align-baseline">
                      <p className="font-semibold text-lg">Shoes</p>

                      {item.shoes.map((link) => (
                        <Link
                          href={`/${item.id}-shoes/${link.toLowerCase()}`}
                          legacyBehavior
                          passHref
                          key={link}
                        >
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            {link}
                          </NavigationMenuLink>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavItems;
