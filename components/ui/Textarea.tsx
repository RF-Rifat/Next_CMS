import React from 'react';

interface TextareaProps {
    defaultValue: string;
    title: string;
    sub: string;
}

const Textarea: React.FC<TextareaProps> = ({ defaultValue, title, sub}) => {
    return (
        <div className="block space-y-1">
            <h1 className="text-base font-normal w-full">
                {title}
            </h1>
            <textarea
                rows={3}
                className="p-2 border outline-0 w-full rounded bg-white"
                defaultValue={defaultValue}
                placeholder={sub}
            />
        </div>
    );
};

export default Textarea;