'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { MdMenuOpen } from 'react-icons/md';

type Props = {};

const AdminMenu = (props: Props) => {
  // state for admin menu
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav>
      <section className="flex md:hidden">
        <MdMenuOpen
          className="w-7 h-7"
          onClick={() => setIsNavOpen((prev) => !prev)}
        />

        {/* Mobile admin menu */}
        <div
          className={
            isNavOpen
              ? 'absolute top-0 right-0 w-[50%] h-[100vh] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white z-10 flex flex-col'
              : 'hidden'
          }
        >
          <div
            className="absolute top-0 right-0 px-8 py-8"
            onClick={() => setIsNavOpen(false)}
          >
            <svg
              className="h-6 w-6 text-gray-600"
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

          <div className="flex flex-col min-h-[250px] p-6 mt-8">
            <>
              <p className="uppercase text-sm font-bold my-3">My Admin</p>
              <hr className="bg-red-500" />

              <div className="flex flex-col space-y-8 text-lg mt-3 uppercase font-semibold">
                <Link
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/my-admin`}
                  onClick={() => setIsNavOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/my-admin/products`}
                  onClick={() => setIsNavOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/my-admin/orders`}
                  onClick={() => setIsNavOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/my-admin/settings`}
                  onClick={() => setIsNavOpen(false)}
                >
                  Settings
                </Link>
              </div>
            </>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default AdminMenu;
