// components/DarkMode.tsx
import React, { useState } from "react";

interface DarkModeProps {
  title: string;
  sub: string;
  toggle: boolean; // initial state
}

export const DarkMode: React.FC<DarkModeProps> = ({ title, sub, toggle }) => {
  const [isChecked, setIsChecked] = useState(toggle);

  const onToggle = () => setIsChecked(!isChecked);

  return (
    <div className="mb-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 mb-2">{sub}</p>
      <button
        onClick={onToggle}
        className={`relative inline-flex items-center h-6 border rounded-full w-14 transition-colors duration-300 outline-0 ${
          isChecked ? "border-blue-500 bg-blue-200" : "bg-gray-100"
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-blue-500 rounded-full transition-transform duration-300 ${
            isChecked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};
