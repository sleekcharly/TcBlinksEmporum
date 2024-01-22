'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { ExtendedUser } from '@/next-auth';
import { logout } from '@/actions/logout';
import LoginForm from './login-form';

type Props = {
  asChild?: boolean;
  user?: ExtendedUser;
};

const AuthButton = ({ asChild, user }: Props) => {
  const onClick = () => {
    logout();
  };

  if (user) {
    return (
      <Button variant="link" onClick={onClick}>
        LOGOUT
      </Button>
    );
  } else {
    return (
      <>
        <DialogTrigger asChild={asChild}>
          <Button variant="link">SIGN IN</Button>
        </DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </>
    );
  }
};

export default AuthButton;
