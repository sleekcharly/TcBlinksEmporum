import { ResetForm } from '@/components/auth/reset-form';
import Image from 'next/image';
import darkImage from '../../../images/backgrounds/verify-email-dark.jpg';
import lightImage from '../../../images/backgrounds/verify-email-light.jpg';

const ResetPage = () => {
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
      <div className="z-10 w-full">
        <ResetForm />
      </div>
    </div>
  );
};

export default ResetPage;
