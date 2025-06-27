// components/Direction.tsx
import React, { useState } from "react";

interface DirectionProps {
  title: string;
  sub: string;
  Redio: boolean; // whether radio mode enabled
}

export const Direction: React.FC<DirectionProps> = ({ title, sub, Redio }) => {
  const [selected, setSelected] = useState<"LTR" | "RTL">("LTR");

  if (!Redio) {
    // just display text or something else if no radio
    return (
      <div className="mb-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{sub}</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 mb-2">{sub}</p>
      <div className="flex space-x-4">
        {["LTR", "RTL"].map((dir) => (
          <label
            key={dir}
            className={`cursor-pointer px-3 py-1 rounded border ${
              selected === dir ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            <input
              type="radio"
              name="direction"
              value={dir}
              checked={selected === dir}
              onChange={() => setSelected(dir as "LTR" | "RTL")}
              className="hidden"
            />
            {dir}
          </label>
        ))}
      </div>
    </div>
  );
};
