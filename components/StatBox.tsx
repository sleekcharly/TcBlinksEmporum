import React from 'react';

type Props = {
  title: string;
  subtitle: string;
  icon1: any;
  icon2: any;
  increase?: number;
};

const StatBox = ({ title, subtitle, icon1, icon2, increase }: Props) => {
  return (
    <div className="p-4 my-0 mx-2 bg-gray-200 dark:bg-[#434957] rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          {icon1}
          <h4 className="font-bold text-[#141414] dark:text-gray-200">
            {title}
          </h4>
        </div>

        <div>{icon2}</div>
      </div>

      <div className="flex justify-between mt-1">
        <h5 className="text-[#4cceac]">{subtitle}</h5>
        {increase && <h5 className="text-[#3da58a]">{increase}%</h5>}
      </div>
    </div>
  );
};

export default StatBox;
