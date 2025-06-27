"use client";
import Image from 'next/image';
import { useState } from 'react';

const Auth = () => {
  const [activeForm, setActiveForm] = useState<'phone' | 'signup' | 'login' | 'forgotPassword'>('phone');
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSwitch = (form: 'phone' | 'signup' | 'login' | 'forgotPassword') => {
    setActiveForm(form);
    setPhoneSubmitted(false); // Reset phone submission when switching forms
  };

  const handlePhoneContinue = () => {
    setPhoneSubmitted(true); // Show password form when phone is submitted
  };

  return (
    <div className='p-4 md:p-6 bg-white w-full rounded-xl shadow border'>
      <div className='text-gray-700 text-center mb-4'>
        <h1 className='text-base font-bold'>
          Welcome to Bikroy
        </h1>
        <p className='text-xs'>
          Log in to manage your account.
        </p>
      </div>
      <div className="flex flex-col">
        {/* Phone Number Form - Default Active */}
        {activeForm === 'phone' && !phoneSubmitted && (
          <div className="w-full">
            <strong className='text-sm mb-2 block'>
              Continue with mobile number & OTP
            </strong>
            <div className="mb-4 block">
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                className="p-2 outline-0 border rounded w-full"
              />
            </div>
            <button
              onClick={handlePhoneContinue}
              className="w-full p-2 bg-main text-white rounded font-semibold"
            >
              Continue
            </button>
            <div className="mt-8 block">
              <button
                onClick={() => handleFormSwitch('login')}
                className="bg-main mb-3 border text-white text-sm font-semibold p-2 rounded w-full flex items-center justify-center space-x-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36"><path fill="white" d="M32.33 6a2 2 0 0 0-.41 0h-28a2 2 0 0 0-.53.08l14.45 14.39Z" /><path fill="white" d="m33.81 7.39l-14.56 14.5a2 2 0 0 1-2.82 0L2 7.5a2 2 0 0 0-.07.5v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-.12-.61M5.3 28H3.91v-1.43l7.27-7.21l1.41 1.41Zm26.61 0h-1.4l-7.29-7.23l1.41-1.41l7.27 7.21Z" /><path fill="none" d="M0 0h36v36H0z"/></svg>
                <p>Continue with Email</p>
              </button>
            </div>
          </div>
        )}

        {/* Password Form (visible after phone number is submitted) */}
        {activeForm === 'phone' && phoneSubmitted && (
          <div className="w-full">
            <div className="mb-4 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="p-2 outline-0 border rounded w-full"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 cursor-pointer text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            <button className="w-full p-2 bg-main text-white rounded font-semibold">Login</button>
            <div className="mt-8 block">
              <button
                onClick={() => handleFormSwitch('login')}
                className="bg-main mb-3 border text-white text-sm font-semibold p-2 rounded w-full flex items-center justify-center space-x-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36"><path fill="white" d="M32.33 6a2 2 0 0 0-.41 0h-28a2 2 0 0 0-.53.08l14.45 14.39Z" /><path fill="white" d="m33.81 7.39l-14.56 14.5a2 2 0 0 1-2.82 0L2 7.5a2 2 0 0 0-.07.5v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-.12-.61M5.3 28H3.91v-1.43l7.27-7.21l1.41 1.41Zm26.61 0h-1.4l-7.29-7.23l1.41-1.41l7.27 7.21Z" /><path fill="none" d="M0 0h36v36H0z"/></svg>
                <p>Continue with Email</p>
              </button>
            </div>
          </div>
        )}

        {/* Signup Form */}
        {activeForm === 'signup' && (
          <div className="w-full">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border border-gray-300 outline-0 rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 outline-0 rounded"
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full p-2 border border-gray-300 outline-0 rounded"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 cursor-pointer text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="w-full p-2 border border-gray-200 outline-0 rounded"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 cursor-pointer text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            <button className="w-full p-2 bg-main text-white rounded">Signup</button>
            <div className="mt-8 block">
              <strong className=' block my-4 text-center text-sm'>
                Already have an account?
              </strong>
              <div className="mt-4">
                <button
                  onClick={() => handleFormSwitch('login')}
                  className="bg-main mb-3 border text-white text-sm font-semibold p-2 rounded w-full flex items-center justify-center space-x-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36"><path fill="white" d="M32.33 6a2 2 0 0 0-.41 0h-28a2 2 0 0 0-.53.08l14.45 14.39Z" /><path fill="white" d="m33.81 7.39l-14.56 14.5a2 2 0 0 1-2.82 0L2 7.5a2 2 0 0 0-.07.5v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-.12-.61M5.3 28H3.91v-1.43l7.27-7.21l1.41 1.41Zm26.61 0h-1.4l-7.29-7.23l1.41-1.41l7.27 7.21Z" /><path fill="none" d="M0 0h36v36H0z"/></svg>
                  <p>Continue with Email</p>
                </button>
                <button
                  onClick={() => handleFormSwitch('phone')}
                  className="bg-secondary mb-3 border text-gray-700 text-sm font-semibold p-2 rounded w-full flex items-center justify-center space-x-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36"><path d="M32.33 6a2 2 0 0 0-.41 0h-28a2 2 0 0 0-.53.08l14.45 14.39Z" /><path d="m33.81 7.39l-14.56 14.5a2 2 0 0 1-2.82 0L2 7.5a2 2 0 0 0-.07.5v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-.12-.61M5.3 28H3.91v-1.43l7.27-7.21l1.41 1.41Zm26.61 0h-1.4l-7.29-7.23l1.41-1.41l7.27 7.21Z" /><path fill="none" d="M0 0h36v36H0z"/></svg>
                  <p>Continue with Phone</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Email Login Form */}
        {activeForm === 'login' && (
          <div className="w-full">
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="p-2 outline-0 border rounded w-full"
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="p-2 outline-0 border rounded w-full"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 cursor-pointer text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            <button className="w-full p-2 bg-main text-white rounded font-semibold">Login</button>
            <div className="mt-4">
              <button
                onClick={() => handleFormSwitch('forgotPassword')}
                className="text-blue-500 text-sm w-full mb-2 block"
              >
                Forgot Password?
              </button>
              <strong className='block my-4 text-center text-sm'>
                Dont have an account yet?
              </strong>
              <div className="mt-4">
                <button
                  onClick={() => handleFormSwitch('signup')}
                  className="bg-main mb-3 border text-white text-sm font-semibold p-2 rounded w-full flex items-center justify-center space-x-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36"><path fill="white" d="M32.33 6a2 2 0 0 0-.41 0h-28a2 2 0 0 0-.53.08l14.45 14.39Z" /><path fill="white" d="m33.81 7.39l-14.56 14.5a2 2 0 0 1-2.82 0L2 7.5a2 2 0 0 0-.07.5v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-.12-.61M5.3 28H3.91v-1.43l7.27-7.21l1.41 1.41Zm26.61 0h-1.4l-7.29-7.23l1.41-1.41l7.27 7.21Z" /><path fill="none" d="M0 0h36v36H0z"/></svg>
                  <p>Continue with Email</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Forgot Password Form */}
        {activeForm === 'forgotPassword' && (
          <div className="w-full">
            <strong className='text-sm mb-2 block'>
              Create a new password
            </strong>
            <p className='text-xs text-gray-500 mb-2 block'>
              Enter the email address you used when you created the ad or account. You will receive an email with the information you need to change your password.
            </p>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 outline-0 border rounded w-full"
              />
            </div>
            <button className="w-full p-2 bg-main text-white rounded font-semibold">
              Submit
            </button>
            <div className="mt-8 block">
              <button
                onClick={() => handleFormSwitch('login')}
                className="bg-main mb-3 border text-white text-sm font-semibold p-2 rounded w-full flex items-center justify-center space-x-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36"><path fill="white" d="M32.33 6a2 2 0 0 0-.41 0h-28a2 2 0 0 0-.53.08l14.45 14.39Z" /><path fill="white" d="m33.81 7.39l-14.56 14.5a2 2 0 0 1-2.82 0L2 7.5a2 2 0 0 0-.07.5v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-.12-.61M5.3 28H3.91v-1.43l7.27-7.21l1.41 1.41Zm26.61 0h-1.4l-7.29-7.23l1.41-1.41l7.27 7.21Z" /><path fill="none" d="M0 0h36v36H0z"/></svg>
                <p>Continue with Email</p>
              </button>
            </div>
          </div>
        )}
        <button className='bg-white mb-3 border text-gray-700 text-sm font-semibold p-2 rounded w-full flex items-center justify-center space-x-1'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 128 128"><path fill="#fff" d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"/><path fill="#e33629" d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"/><path fill="#f8bd00" d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"/><path fill="#587dbd" d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"/><path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"/></svg>
          <p>
            Continue with Google
          </p>
        </button>
        <button className='bg-[#3b5999] mb-3 text-white text-sm font-semibold p-2 rounded w-full flex items-center justify-center space-x-1'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" d="M20.9 2H3.1A1.1 1.1 0 0 0 2 3.1v17.8A1.1 1.1 0 0 0 3.1 22h9.58v-7.75h-2.6v-3h2.6V9a3.64 3.64 0 0 1 3.88-4a20 20 0 0 1 2.33.12v2.7H17.3c-1.26 0-1.5.6-1.5 1.47v1.93h3l-.39 3H15.8V22h5.1a1.1 1.1 0 0 0 1.1-1.1V3.1A1.1 1.1 0 0 0 20.9 2"/></svg>
          <p>
            Continue with Facebook
          </p>
        </button>
      </div>
    </div>
  );
};

export default Auth;