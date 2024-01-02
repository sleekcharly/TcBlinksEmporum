import React from 'react';
import Logo from '../logo';
import NavItems from './NavItems';
import DarkModeToggle from './DarkModeToggle';
import CartNotification from './CartNotification';
import AccountMenu from './AccountMenu';
import SearchInput from './SearchInput';

type Props = {};

const Header = ({}: Props) => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 w-full">
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
            {/* Cart count notification  */}
            <CartNotification />
            {/* dark  mode toggle */}
            <DarkModeToggle />
          </div>
        </div>

        {/* Search input */}
        <SearchInput isMobile={true} />
      </nav>
    </header>
  );
};

export default Header;
