import React from 'react';

interface ColorProps {
    defaultValue: string;
    title: string;
    sub: string;
}

const Color: React.FC<ColorProps> = ({ defaultValue, title, sub}) => {
    return (
        <div className="block space-y-1">
            <h1 className="text-base font-normal w-full">
                {title}
            </h1>
            <input
                type="color"
                className="h-8 border border-gray-200 outline-0 w-full rounded bg-white"
                defaultValue={defaultValue}
                placeholder={sub}
            />
        </div>
    );
};

export default Color;