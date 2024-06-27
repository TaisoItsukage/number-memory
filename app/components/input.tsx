// components/ui/Input.tsx
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => {
  const inputStyle = `
    w-full px-3 py-2 
    border border-gray-300 rounded-md 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    placeholder-gray-400
    transition-colors duration-200
    ${className}
  `;

  return <input className={inputStyle} ref={ref} {...props} />;
});

Input.displayName = 'Input';

export default Input;