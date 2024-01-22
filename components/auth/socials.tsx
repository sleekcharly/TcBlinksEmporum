'use client';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

type Props = {};

const Socials = (props: Props) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  // sign in with OAuth provider
  const OAuthSignIn = (provider: 'google' | 'facebook') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => OAuthSignIn('google')}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => OAuthSignIn('facebook')}
      >
        <FaFacebook className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Socials;
