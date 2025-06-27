"use client";
import { useState } from 'react';

interface ToggleProps {
  title: string;
  Switch: boolean;
  children: React.ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({ title, Switch, children }) => {
  const [isChecked, setIsChecked] = useState(Switch);

  const onToggle = () => setIsChecked(!isChecked);

  return (
    <div className='w-full mb-4'>
      <div className="flex items-center justify-between w-full mb-1 border border-blue-200 p-1">
        <span className="text-base font-medium text-blue-500">{title}</span>
        <div
          onClick={onToggle}
          className={`relative inline-flex items-center h-6 border rounded-full w-12 cursor-pointer transition-colors duration-300 ${
            isChecked ? 'border-blue-500' : 'border-gray-200'
          }`}
        >
          <span
            className={`inline-block w-4 h-4 transform bg-blue-500 rounded-full transition-transform duration-300 ${
              isChecked ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </div>
      </div>
      {/* Information visibility */}
      {isChecked && <div className='w-full'>{children}</div>}
    </div>
  );
};

export default Toggle;
