import * as React from 'react';
import Logo from '../../logo';
import { Button } from '../../ui/button';
import Link from 'next/link';
import logo from '@logos/logo.svg';

type Props = {
  first_name: string;
  confirmLink: string;
};

export const VerifyEmail = ({ first_name, confirmLink }: Props) => {
  return `
    <div style="margin-left:auto; margin-right:auto; margin-top:10px; padding:5px; width:465px;">
      <section style="margin-top:32px;">
        <img src="http://localhost:3000/_next/static/media/logo.89a37f5d.svg" alt="TC Blinks logo"/>
      </section>
      
      <h1 style="font-size:20px; line-height:2rem; font-weight:bold; text-align:center; padding:0px; margin-top:2rem; margin-bottom:2rem; margin-left:0px; margin-right:0px;">

        Welcome to <strong>TC Blinks Emporium<, ${first_name}</strong>
      </h1>
      
      <p style="font-size:0.875rem; line-height:1.25rem;">
        We're excited to have you onboard at <strong>TCBlinks Emporium</strong>.
        Click the link below to verify your email and enjoy amazing benefits.
      </p>
      
      <section style="text-align: center; margin-top: 32px;">
     
          <a href="${confirmLink}" style="text-decoration:none;">
            <p style="background-color:#00A3FF; border-radius:3px; color:white; font-size:0.75rem; line-height:1rem; font-weight:600; text-align:center; cursor:pointer; padding:10px;">Verify Email</p>
          </a>
        
      </section>

      <p style="font-size:1rem; line-height:1.5rem;">
        Cheers, <br /> The <strong>TCBlinksEmporium Team</strong>
      </p>
    </div>
  `;
};
