import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend,
  color = 'blue' 
}) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          
          {trend && (
            <div className="mt-2 flex items-center text-sm">
              {trend.value === 0 ? (
                <>
                  <Minus className="w-4 h-4 text-gray-500" />
                  <span className="ml-1 text-gray-600">No change</span>
                </>
              ) : trend.isPositive ? (
                <>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="ml-1 text-green-600">+{trend.value}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span className="ml-1 text-red-600">{trend.value}%</span>
                </>
              )}
              <span className="ml-2 text-gray-500">vs last period</span>
            </div>
          )}
        </div>
        
        <div className={`${colorClasses[color]} p-3 rounded-lg`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};
