"use client";
import React from 'react';

interface SelectProps {
    items: string[];
    title: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ items, title, defaultValue, onChange }) => {
    return (
        <div className="block space-y-1">
            <h1 className="text-base font-normal w-full">
                {title}
            </h1>
            <select 
                className="block w-full p-1.5 text-gray-700 bg-white appearance-none outline-0"
                value={defaultValue || ""}
                onChange={(e) => onChange?.(e.target.value)}
            >
                <option value="">Select {title}</option>
                {items.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;