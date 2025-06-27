"use client";
import { useState } from "react";

interface ToggleProps {
  title: string;
  Switch?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ title, Switch = false }) => {
  const [isChecked, setIsChecked] = useState(Switch);

  const onToggle = () => setIsChecked((prev) => !prev);

  return (
    <div className="flex items-center justify-between w-full my-1">
    <span className="text-base font-normal w-full">{title}</span>
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

export default Toggle;
