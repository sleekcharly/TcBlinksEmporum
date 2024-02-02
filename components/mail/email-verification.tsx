import React from 'react';
import Logo from '../logo';
import { Button } from '../ui/button';
import Link from 'next/link';

type Props = {
  first_name: string;
  confirmLink: string;
};

export const VerifyEmail = ({ first_name, confirmLink }: Props) => {
  return (
    <div className="mx-auto my-10 p-5 w-[465px]">
      <section className="mt-8">
        <Logo />
      </section>
      <header className="text-2xl font-normal text-center p-0 my-8 mx-0">
        <strong>Welcome to TCBlinks Emporium</strong>, {first_name}
      </header>
      <p className="text-sm">Hello {first_name}</p>
      <p className="text-sm">
        We're excited to have you onboard at <strong>TCBlinks Emporium</strong>.
        Click the link below to verify your email and enjoy amazing benefits.
      </p>
      <section className="text-center mt-[32px] mb-[32px]">
        <Button className="bg-[#00A3FF] rounded-md text-white text-xs font-semibold no-underline text-center">
          <Link href={confirmLink}>Verify Email</Link>
        </Button>
      </section>

      <p className="text-base">
        Cheers, <br /> The TCBlinksEmporium Team
      </p>
    </div>
  );
};
