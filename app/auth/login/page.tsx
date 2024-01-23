import LoginForm from '@/components/auth/login-form';
import darkImage from '../../../images/backgrounds/login-dark.webp';
import lightImage from '../../../images/backgrounds/login-light.webp';
import Image from 'next/image';

const Login = () => {
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
      <div className="z-10 lg:absolute lg:top-4 dark:right-2 lg:ml-4 dark:ml-0">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
