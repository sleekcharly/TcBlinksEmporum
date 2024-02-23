import React from 'react';
import LineChart from './charts/LineChart';

type Props = {};

const RevenueChart = (props: Props) => {
  return (
    <div className="bg-gray-200 dark:bg-[#434957] rounded-md p-3">
      <div className="flex flex-col space-y-2">
        <h5 className="font-[600]">Total Revenue</h5>
        <h3 className="font-bold text-[#4cceac]">₦450,000</h3>
      </div>

      <div className="h-[250px]">
        <LineChart isDashboard={true} />
      </div>
    </div>
  );
};

export default RevenueChart;
