'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Poppins } from 'next/font/google';
import { BeatLoader, BounceLoader } from 'react-spinners';

import { cn } from '@/lib/utils';
import { FormSuccess } from '../form-success';
import { FormError } from '../form-error';
import { newVerification } from '@/actions/new-verification';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  // set router component
  const router = useRouter();

  // get Url search parameters
  const searchParams = useSearchParams();

  // get token from search parameters
  const token = searchParams.get('token');

  // verification function
  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Missing token!');
      return;
    }

    newVerification(token)
      .then((data) => {
        data.success ? setSuccess(data.success) : setError(data.error);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
    success &&
      setTimeout(() => {
        router.push(`${process.env.NEXTAUTH_URL}`);
      }, 2500);
  }, [onSubmit]);

  return (
    <Card className="w-[90%] md:w-[600px] shadow-md dark:bg-gray-100 dark:text-gray-900 mx-5 my-auto md:mx-auto">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1
            className={cn(
              'text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold',
              font.className,
            )}
          >
            🔏 Great Work!
          </h1>

          <p className="text-sm md:text-base lg:text-xl">
            Confirming your verification
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center w-full justify-center">
          {!success && !error && <BounceLoader />}

          <FormSuccess message={success} />
          {!success && <FormError message={error} />}
        </div>
      </CardContent>
    </Card>
  );
};
