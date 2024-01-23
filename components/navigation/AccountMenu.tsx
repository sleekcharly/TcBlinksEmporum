'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { ChevronDownIcon, UserIcon } from 'lucide-react';
import { useCurrentUser } from '@/hooks/use-current-user';
import Link from 'next/link';

const AccountMenu = () => {
  const user = useCurrentUser();

  return (
    <div className="hidden md:flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="flex items-center space-x-2">
            <span className="hidden lg:flex">Account</span>
            <UserIcon className="lg:hidden" size="16px" />
            <ChevronDownIcon size="16px" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {user ? (
            <Button variant="link">LOGOUT</Button>
          ) : (
            <Button variant="link">
              <Link href="/auth/login">SIGN IN</Link>
            </Button>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem role="button" className="cursor-pointer">
              Account
            </DropdownMenuItem>
            <DropdownMenuItem role="button" className="cursor-pointer">
              My Orders
            </DropdownMenuItem>
            <DropdownMenuItem role="button" className="cursor-pointer">
              Saved Items
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AccountMenu;
