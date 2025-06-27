import React from 'react';

interface PasswordProps {
    defaultValue: string;
    title: string;
    sub: string;
}

const Password: React.FC<PasswordProps> = ({ defaultValue, title, sub}) => {
    return (
        <div className="block space-y-1">
            <h1 className="text-base font-normal w-full">
                {title}
            </h1>
            <input
                type="password"
                className="p-2 border outline-0 w-full rounded bg-white"
                defaultValue={defaultValue}
                placeholder={sub}
            />
        </div>
    );
};

export default Password;