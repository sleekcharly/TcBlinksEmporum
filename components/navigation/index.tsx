import React from 'react';
import Logo from '../logo';
import NavItems from './NavItems';
import DarkModeToggle from './DarkModeToggle';
import CartNotification from './CartNotification';
import AccountMenu from './AccountMenu';
import SearchInput from './SearchInput';
import MobileMenu from './MobileMenu';
import { admin } from '@/actions/admin';
import Link from 'next/link';
import { Button } from '../ui/button';

const Header = async () => {
  const userAdmin = await admin().then((data) => {
    if (data.success) {
      return true;
    } else {
      return false;
    }
  });

  // get admin or user status
  const isAdmin = userAdmin;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 w-full border border-b-2 border-b-gray-100 dark:border-b-gray-700">
      <nav className="bg-white dark:bg-gray-900 max-w-screen  mx-auto p-4 ">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center justify-between gap-10">
            <Logo />

            <NavItems />
          </div>

          {/* Search input */}
          <SearchInput isMobile={false} />

          <div className="flex items-center gap-4">
            {/* Account Menu */}
            <AccountMenu />

            {/* user admin button */}
            {isAdmin && (
              <Link
                href={`${process.env.NEXTAUTH_URL}/my-admin`}
                className="hidden lg:block"
              >
                <Button>My Admin</Button>
              </Link>
            )}

            {/* Cart count notification  */}
            <CartNotification />
            {/* dark  mode toggle */}
            <DarkModeToggle />
            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>

        {/* Search input */}
        <SearchInput isMobile={true} />
      </nav>
    </header>
  );
};

export default Header;
