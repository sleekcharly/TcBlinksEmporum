import * as React from 'react';

type Props = {
  resetLink: string;
};

export const ResetPassword = ({ resetLink }: Props) => {
  return `
    <div style="margin-left:auto; margin-right:auto; margin-top:10px; padding:5px; width:465px;">
      <section style="margin-top:32px;">
        <img src="http://localhost:3000/_next/static/media/logo.89a37f5d.svg" alt="TC Blinks logo"/>
      </section>
      
      <h1 style="font-size:20px; line-height:2rem; font-weight:bold; text-align:center; padding:0px; margin-top:2rem; margin-bottom:2rem; margin-left:0px; margin-right:0px;">

        Reset your <strong>TC Blinks Emporium</strong> password
      </h1>
      
      <section style="text-align: center; margin-top: 32px;">
     
          <a href="${resetLink}" style="text-decoration:none;">
            <p style="background-color:#00A3FF; border-radius:3px; color:white; font-size:0.75rem; line-height:1rem; font-weight:600; text-align:center; cursor:pointer; padding:10px;">Click here to reset your password</p>
          </a>
        
      </section>

      <p style="font-size:1rem; line-height:1.5rem;">
        If you didn't request a reset, don't worry. You can ignore this email.
      </p>

      <p style="font-size:1rem; line-height:1.5rem;">
        <strong>TCBlinksEmporium</strong>, your one stop shop for your trendy outfits and shoes.
      </p>
    </div>
  `;
};
