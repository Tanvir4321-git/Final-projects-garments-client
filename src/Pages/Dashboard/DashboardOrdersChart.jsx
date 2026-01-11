import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useAxiosHook from '../../Components/CustomHooks/useAxiosHook';

const COLORS = {
  'parcel_created': '#3B82F6',
  'waiting for confirmation': '#F59E0B',
  'confirmed': '#8B5CF6',
  'shipped': '#10B981',
  'out for delivery': '#06B6D4',
  'delivered': '#22C55E',
  'cancelled': '#EF4444'
};

const statusNames = {
  'parcel_created': 'Parcel Created',
  'waiting for confirmation': 'Waiting Confirmation',
  'confirmed': 'Confirmed',
  'shipped': 'Shipped',
  'out for delivery': 'Out for Delivery',
  'delivered': 'Delivered',
  'cancelled': 'Cancelled'
};

const DashboardOrdersChart = () => {
  const axioshook = useAxiosHook();

  const { data: ordersSummary = {}, isLoading } = useQuery({
    queryKey: ['ordersSummary'],
    queryFn: async () => {
      const res = await axioshook('/orders/summary');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-60">
        <p className="text-gray-900 dark:text-white">Loading orders summary...</p>
      </div>
    );
  }

  const { totalOrders = 0, statusCounts = {} } = ordersSummary;

  // Prepare data for bar chart
  const chartData = Object.entries(statusCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([status, count]) => ({
      name: statusNames[status] || status,
      value: count,
      color: COLORS[status] || '#6B7280'
    }));

  // Custom tooltip for chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-900 dark:text-white font-semibold">{payload[0].payload.name}</p>
          <p className="text-gray-600 dark:text-gray-400">Orders: {payload[0].value}</p>
          <p className="text-gray-600 dark:text-gray-400">
            {totalOrders > 0 ? ((payload[0].value / totalOrders) * 100).toFixed(1) : 0}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    
    <div>

             
      <h2 className="text-4xl text-center font-bold my-10  text-gray-900 dark:text-white">
        <span className="mr-2">📋</span> Order Status
      </h2>

    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">

   

 {/* Bar Chart */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Visual Overview
            </h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    className="stroke-gray-300 dark:stroke-gray-600"
                    opacity={0.3} 
                  />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fill: '#9CA3AF' }}
                    stroke="#9CA3AF"
                  />
                  <YAxis 
                    tick={{ fill: '#9CA3AF' }}
                    stroke="#9CA3AF"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    radius={[8, 8, 0, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>


      <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
        <span className="mr-2">📋</span> Status Summary
      </h2>


      {Object.keys(statusCounts).length > 0 ? (
        <>
          {/* Original Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-left py-2 px-3 text-gray-900 dark:text-white">Status</th>
                  <th className="text-center py-2 px-3 text-gray-900 dark:text-white">Count</th>
                  <th className="text-right py-2 px-3 text-gray-900 dark:text-white">%</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(statusCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([status, count]) => (
                    <tr key={status} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2 px-3">
                        <div className="flex items-center">
                          <span
                            className="inline-block w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: COLORS[status] || '#6B7280' }}
                          ></span>
                          <span className="text-gray-900 dark:text-white">
                            {statusNames[status] || status}
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-2 px-3">
                        <span className="inline-block bg-blue-100 dark:bg-blue-600 text-gray-900 dark:text-white px-3 py-1 rounded-full font-medium">
                          {count}
                        </span>
                      </td>
                      <td className="text-right py-2 px-3 text-gray-900 dark:text-white">
                        {totalOrders > 0
                          ? ((count / totalOrders) * 100).toFixed(1)
                          : 0}
                        %
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

         
        </>
      ) : (
        <p className="text-center py-6 text-gray-900 dark:text-white">No orders found</p>
      )}
    </div>
    </div>

  );
};

export default DashboardOrdersChart;