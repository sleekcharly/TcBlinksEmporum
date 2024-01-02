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
      <nav className="bg-white dark:bg-gray-900 max-w-screen flex items-center justify-between mx-auto p-4 gap-8">
        <div className="flex items-center justify-between gap-10">
          <Logo />

          <NavItems />
        </div>

        {/* Search input */}
        <SearchInput />

        <div className="flex items-center gap-4">
          {/* Account Menu */}
          <AccountMenu />
          {/* Cart count notification  */}
          <CartNotification />
          {/* dark  mode toggle */}
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
