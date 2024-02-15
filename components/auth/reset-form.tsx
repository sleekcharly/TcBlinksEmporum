'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '../ui/card';

import { Poppins } from 'next/font/google';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { Button } from '../ui/button';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetSchema } from '@/schemas';
import { reset } from '@/actions/reset';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export const ResetForm = () => {
  const router = useRouter();

  // form transition
  const [isPending, startTransition] = useTransition();

  // component state
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  useEffect(() => {
    success &&
      setTimeout(() => {
        router.push(`${process.env.NEXTAUTH_URL}/auth/login`);
      }, 3000);
  }, [success]);

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
            🗝️ Forgot your password?
          </h1>

          <p className="text-sm md:text-base lg:text-xl">Let's fix this </p>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter your email!"
                        type="email"
                        className="dark:text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormError message={error} />
              <FormSuccess message={success} />

              <Button
                type="submit"
                className="w-full dark:bg-blue-500 font-bold flex items-center space-x-2"
                disabled={isPending}
              >
                <span>Send reset Email</span>
                {isPending && <ClipLoader size={20} color={'aqua'} />}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
