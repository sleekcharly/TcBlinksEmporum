import RegisterForm from '@/components/auth/register-form';
import Image from 'next/image';
import React from 'react';
import darkImage from '../../../images/backgrounds/register-dark.webp';
import lightImage from '../../../images/backgrounds/register-light.webp';

type Props = {};

const Register = (props: Props) => {
  return (
    <div className="relative w-full h-screen">
      <Image
        className="hidden dark:block object-cover -z-10"
        src={darkImage}
        alt="register form background image"
        fill
        priority
      />
      <Image
        className="block dark:hidden object-cover -z-10"
        src={lightImage}
        alt="register form background image"
        fill
        priority
      />
      <div className="z-10 lg:absolute lg:top-2 lg:right-2">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
