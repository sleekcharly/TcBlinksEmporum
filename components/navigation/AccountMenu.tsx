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
import AuthButton from '../auth/auth-button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Dialog } from '../ui/dialog';

const AccountMenu = () => {
  const user = useCurrentUser();

  return (
    <div className="hidden md:flex">
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="flex items-center space-x-2">
              <span className="hidden lg:flex">Account</span>
              <UserIcon className="lg:hidden" size="16px" />
              <ChevronDownIcon size="16px" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <AuthButton user={user} asChild />

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
      </Dialog>
    </div>
  );
};

export default AccountMenu;
