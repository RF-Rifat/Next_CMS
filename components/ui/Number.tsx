// <Number
//     defaultValue="hello"
//     title="Title"
//     sub: "Enter your title";
// />

import React from 'react';

interface NumberProps {
    defaultValue: string;
    title: string;
    sub: string;
}

const Number: React.FC<NumberProps> = ({ defaultValue, title, sub}) => {
    return (
        <div className="block space-y-1">
            <h1 className="text-base font-normal w-full">
                {title}
            </h1>
            <input
                type="number"
                className="p-2 border outline-0 w-full rounded bg-white"
                defaultValue={defaultValue}
                placeholder={sub}
            />
        </div>
    );
};

export default Number;