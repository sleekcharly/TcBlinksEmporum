import StatBox from '@/components/StatBox';
import React from 'react';
import { FaCartArrowDown, FaPeopleCarry, FaSalesforce } from 'react-icons/fa';
import { TbCurrencyNaira, TbSum } from 'react-icons/tb';
import { FcSalesPerformance } from 'react-icons/fc';
import { RiProductHuntFill, RiUserSmileFill } from 'react-icons/ri';

type Props = {};

const page = (props: Props) => {
  return (
    <div className="p-3">
      <div className="flex flex-col gap-y-2 mb-7 ">
        <h2 className="text-xl lg:text-2xl font-bold">DASHBOARD</h2>
        <h5 className="text-[#3da58a]">Welcome to your dashboard</h5>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <StatBox
          title="450,000"
          subtitle="Total Sales"
          increase={14}
          icon1={<FcSalesPerformance className="w-10 h-10" />}
          icon2={<TbCurrencyNaira className="w-10 h-10" />}
        />

        <StatBox
          title="1,200"
          subtitle="Total Orders"
          icon1={<FaCartArrowDown className="w-10 h-10" />}
          icon2={<TbSum className="w-10 h-10" />}
        />

        <StatBox
          title="250"
          subtitle="Total Products"
          icon1={<RiProductHuntFill className="w-10 h-10" />}
          icon2={<TbSum className="w-10 h-10" />}
        />

        <StatBox
          title="150"
          subtitle="Registered Users"
          icon1={<FaPeopleCarry className="w-10 h-10" />}
          icon2={<RiUserSmileFill className="w-10 h-10" />}
        />
      </div>
    </div>
  );
};

export default page;
