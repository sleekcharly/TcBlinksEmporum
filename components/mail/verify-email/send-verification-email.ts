import { VerifyEmail } from './verify-email-template';

type Props = {
  first_name: string;
  confirmLink: string;
};

export const sendVerificationEmail = ({ first_name, confirmLink }: Props) => {
  return VerifyEmail({ first_name, confirmLink });
};
