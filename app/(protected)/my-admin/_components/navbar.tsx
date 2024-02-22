'use client';

import AdminMenu from '@/components/navigation/AdminMenu';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiAdminLine } from 'react-icons/ri';
import {
  FaCalendar,
  FaFileInvoice,
  FaHome,
  FaTeamspeak,
  FaUserEdit,
} from 'react-icons/fa';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { PersonStanding } from 'lucide-react';
import { FcBarChart, FcLineChart, FcPieChart } from 'react-icons/fc';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {};

const Navbar = (props: Props) => {
  const [fullNav, setFullNav] = useState(false);

  return (
    <div
      className={`flex flex-col ${
        !fullNav && 'text-center items-center w-20'
      } gap-y-8 p-3 dark:bg-[#434957]  ${
        fullNav && 'w-56'
      } overflow-y-scroll max-h-screen scroll-smooth`}
    >
      {/* admin title */}
      <div
        className={`flex flex-row   ${
          fullNav && 'justify-between items-center'
        }`}
      >
        {fullNav && <h1 className="font-semibold">TC Blinks Admin</h1>}

        <div
          className="space-y-1 cursor-pointer"
          onClick={() => setFullNav((prev) => !prev)}
        >
          <span className="block h-0.5 w-6 animate-pulse bg-gray-600 dark:bg-gray-300"></span>
          <span className="block h-0.5 w-6 animate-pulse bg-gray-600 dark:bg-gray-300"></span>
          <span className="block h-0.5 w-6 animate-pulse bg-gray-600 dark:bg-gray-300"></span>
        </div>
      </div>

      {/* admin profile info */}
      {fullNav && (
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="w-28 h-28">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <p>Name</p>
        </div>
      )}

      {/* navigations */}
      <div
        className={`flex flex-col ${
          !fullNav && 'items-center'
        } gap-y-6 text-sm`}
      >
        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/my-admin`}
          className={`flex ${fullNav && 'items-center space-x-4'} font-bold`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaHome className={`${!fullNav && 'w-6 h-6'}`} />
              </TooltipTrigger>
              <TooltipContent>
                <p>My Dashboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {fullNav && <p>Dashboard</p>}
        </Link>

        <p className={`${!fullNav && 'mt-5'}`}>Data</p>
        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/my-admin/products`}
          className={`flex items-center space-x-4 font-bold ${
            fullNav && 'ml-5'
          }`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MdProductionQuantityLimits
                  className={`${!fullNav && 'w-6 h-6'}`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Products</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {fullNav && <p>Products</p>}
        </Link>

        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/my-admin/invoices`}
          className={`flex items-center space-x-4 font-bold ${
            fullNav && 'ml-5'
          }`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaFileInvoice className={`${!fullNav && 'w-6 h-6'}`} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Invoices</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {fullNav && <p>Invoices</p>}
        </Link>

        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/my-admin/customers`}
          className={`flex items-center space-x-4 font-bold ${
            fullNav && 'ml-5'
          }`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <PersonStanding className={`${!fullNav && 'w-6 h-6'}`} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Customers</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {fullNav && <p>Customers</p>}
        </Link>

        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/my-admin/my-team`}
          className={`flex items-center space-x-4 font-bold ${
            fullNav && 'ml-5'
          }`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaTeamspeak className={`${!fullNav && 'w-6 h-6'}`} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Manage Team</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {fullNav && <p>Manage Team</p>}
        </Link>

        <p className={`${!fullNav && 'mt-5'}`}>Pages</p>
        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/my-admin/new-user`}
          className={`flex items-center space-x-4 font-bold ${
            fullNav && 'ml-5'
          }`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaUserEdit className={`${!fullNav && 'w-6 h-6'}`} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Create User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {fullNav && <p>Create new User</p>}
        </Link>

        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/my-admin/calender`}
          className={`flex items-center space-x-4 font-bold ${
            fullNav && 'ml-5'
          }`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaCalendar className={`${!fullNav && 'w-6 h-6'}`} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Calendar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {fullNav && <p>Calendar</p>}
        </Link>

        <p className={`${!fullNav && 'mt-5'}`}>Charts</p>
        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/my-admin/bar-chart`}
          className={`flex items-center space-x-4 font-bold ${
            fullNav && 'ml-5'
          }`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FcBarChart className={`${!fullNav && 'w-6 h-6'}`} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Bar Chart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {fullNav && <p>Bar Chart</p>}
        </Link>

        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/my-admin/pie-chart`}
          className={`flex items-center space-x-4 font-bold ${
            fullNav && 'ml-5'
          }`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FcPieChart className={`${!fullNav && 'w-6 h-6'}`} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Pie Chart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {fullNav && <p>Pie Chart</p>}
        </Link>

        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/my-admin/line-chart`}
          className={`flex items-center space-x-4 font-bold ${
            fullNav && 'ml-5'
          }`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FcLineChart className={`${!fullNav && 'w-6 h-6'}`} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Line Chart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {fullNav && <p>Line Chart</p>}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
