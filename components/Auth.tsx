"use client";
import Image from 'next/image';
import { useState } from 'react';

const Auth = () => {
  const [activeForm, setActiveForm] = useState<'login' | 'signup' | 'forgotPassword'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleFormSwitch = (form: 'signup' | 'login' | 'forgotPassword') => {
    setActiveForm(form);
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email: loginEmail, password: loginPassword })
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok && data.user) {
      window.location.href = '/nx-admin';
    } else {
      setError(data.error || 'Login failed');
    }
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
        {activeForm === 'login' && (
          <form className="w-full" onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="p-2 outline-0 border rounded w-full"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="p-2 outline-0 border rounded w-full"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 cursor-pointer text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <button type="submit" className="w-full p-2 bg-main text-white rounded font-semibold" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => handleFormSwitch('forgotPassword')}
                className="text-blue-500 text-sm w-full mb-2 block"
              >
                Forgot Password?
              </button>
              <strong className='block my-4 text-center text-sm'>
                Don't have an account yet?
              </strong>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => handleFormSwitch('signup')}
                  className="bg-main mb-3 border text-white text-sm font-semibold p-2 rounded w-full flex items-center justify-center space-x-1"
                >
                  <p>Sign up with Email</p>
                </button>
              </div>
            </div>
          </form>
        )}
        {/* ... keep signup and forgot password forms as needed ... */}
      </div>
    </div>
  );
};

export default Auth;