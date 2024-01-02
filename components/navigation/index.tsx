import React from 'react';
import Logo from '../logo';
import NavItems from './NavItems';
import DarkModeToggle from './DarkModeToggle';

type Props = {};

const Header = ({}: Props) => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 w-full">
      <nav className="bg-white dark:bg-gray-900 max-w-screen flex items-center justify-between mx-auto p-4">
        <Logo />

        <NavItems />

        {/* dark  mode toggle */}
        <DarkModeToggle />
      </nav>
    </header>
  );
};

export default Header;
