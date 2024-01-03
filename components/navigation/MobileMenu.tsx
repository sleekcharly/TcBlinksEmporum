'use client';

import { navOptions } from '@/utils';
import { Shirt, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../ui/button';

type Props = {};

const MobileMenu = (props: Props) => {
  // set state for hamburger menu
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav>
      <section className="flex lg:hidden">
        <div
          className="space-y-2"
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600 dark:bg-gray-300"></span>
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600 dark:bg-gray-300"></span>
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600 dark:bg-gray-300"></span>
        </div>

        {/* Mobile menu */}
        <div
          className={
            isNavOpen
              ? ' absolute top-0 right-0 w-[50%] h-[100vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-white z-10 flex flex-col'
              : 'hidden'
          }
        >
          <div
            className="absolute top-0 right-0 px-8 py-8"
            onClick={() => setIsNavOpen(false)}
          >
            <svg
              className="h-8 w-8 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>

          <div className="flex flex-col  min-h-[250px] p-6 mt-16">
            <p className="uppercase text-sm font-bold my-3">Account</p>
            <hr className="bg-red-500" />
            <ul className="uppercase text-base ml-5 my-3 space-y-3">
              <li className="mt-1 font-light">
                <Link href="/account">Account</Link>
              </li>

              <li className="mt-1 font-light">
                <Link href="/orders">My Orders</Link>
              </li>

              <li className="mt-1 font-light">
                <Link href="/saved-items">Saved Items</Link>
              </li>
            </ul>
            <p className="uppercase text-sm font-bold my-3">Our Categories</p>
            <hr className="bg-red-500" />
            <span className="uppercase flex items-center space-x-2 font-semibold mt-3">
              <Shirt size="16px" /> <p>Clothing</p>
            </span>
            <ul className="uppercase text-base ml-5 my-3 space-y-3">
              {navOptions.map((item) => (
                <li key={item.id} className="mt-1 font-light">
                  <Link href={`/${item.id}-clothing`}>
                    {item.label} Clothing
                  </Link>
                </li>
              ))}
            </ul>

            <span className="uppercase flex items-center space-x-2 font-semibold mt-3">
              <ShoppingBag size="16px" /> <p>Shoes</p>
            </span>
            <ul className="uppercase text-base ml-5 my-3 space-y-3">
              {navOptions.map((item) => (
                <li key={item.id} className="mt-1 font-light">
                  <Link href={`/${item.id}-shoes`}>{item.label} shoes</Link>
                </li>
              ))}
            </ul>

            <Button>SIGN IN</Button>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default MobileMenu;
