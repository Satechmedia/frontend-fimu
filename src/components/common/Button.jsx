/* eslint-disable react/prop-types */
// Button.jsx
import clsx from 'clsx';

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  return (
    <button
      className={clsx(
        'btn',
        {
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
