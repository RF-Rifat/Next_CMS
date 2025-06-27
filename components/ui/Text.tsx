import React from 'react';

interface TextProps {
    defaultValue: string;
    title: string;
    sub: string;
    onChange?: (value: string) => void;
}

const Text: React.FC<TextProps> = ({ defaultValue, title, sub, onChange }) => {
    return (
        <div className="block space-y-1">
            <h1 className="text-base font-normal w-full">
                {title}
            </h1>
            <input
                type="text"
                className="p-2 outline-0 w-full rounded bg-white"
                defaultValue={defaultValue}
                placeholder={sub}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </div>
    );
};

export default Text;