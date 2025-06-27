"use client";
import { useState } from 'react';
import Link from 'next/link';
import Auth from './Auth';

const Login = () => {
    const [showPopup, setShowPopup] = useState(false);

    const toggleLogin = () => {
      setShowPopup(!showPopup);
    };

  return (
    <div className="relative">
      <Link
        className="cursor-pointer bg-white dark:bg-darks dark:text-white rounded-full px-3 py-1 hover:bg-secondary text-gray-700 font-bold text-sm flex items-center space-x-1"
        href="/auth"
        onClick={(e) => {
          e.preventDefault();
          toggleLogin();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2S7.5 4.019 7.5 6.5M20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1z"/></svg>
        <span>Login</span>
      </Link>

      {showPopup && (
        <div className="fixed z-50 top-0 right-0 bottom-0 left-0 bg-black/30 flex items-center justify-center">
          <div className="w-full max-w-md relative">
            <button onClick={toggleLogin} className='absolute right-4 top-4'>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32"><path fill="currentColor" d="M17.414 16L24 9.414L22.586 8L16 14.586L9.414 8L8 9.414L14.586 16L8 22.586L9.414 24L16 17.414L22.586 24L24 22.586z"/></svg>
            </button>
            <Auth />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;