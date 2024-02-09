'use client';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { FormError } from '../form-error';

type Props = {};

const Socials = (props: Props) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const signInError = searchParams.get('error');

  const [error, setError] = useState<string | undefined>();

  // sign in with OAuth provider
  const OAuthSignIn = (provider: 'google' | 'facebook') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  useEffect(() => {
    signInError &&
      signInError === 'OAuthAccountNotLinked' &&
      setError('Email already in use!');
  }, [signInError]);

  return (
    <div>
      <FormError message={error} />
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
    </div>
  );
};

export default Socials;
