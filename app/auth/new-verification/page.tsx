import { NewVerificationForm } from '@/components/auth/new-verification-form';
import Image from 'next/image';
import darkImage from '../../../images/backgrounds/verify-email-dark.jpg';
import lightImage from '../../../images/backgrounds/verify-email-light.jpg';

const NewVerificationPage = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
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
      <div className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <NewVerificationForm />
      </div>
    </div>
  );
};

export default NewVerificationPage;
