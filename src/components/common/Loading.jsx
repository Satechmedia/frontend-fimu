/* eslint-disable react/prop-types */
import clsx from 'clsx';

export const Loading = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={clsx(
        'animate-spin rounded-full border-4 border-gray-200 border-t-blue-600',
        sizeClasses[size]
      )} />
    </div>
  );
};