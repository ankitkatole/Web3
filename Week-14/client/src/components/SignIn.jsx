import React from 'react'
import { useState } from 'react';

const SignIn = ({ onSwitchToSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In Data:', { username, password });
    console.log('Sign In attempted! Check console for data.');
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/30 border border-gray-700 relative overflow-hidden group">
      
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl -z-10"></div>

      <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-400 tracking-wide">Welcome Back!</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2 transform translate-x-1 transition duration-300 ease-out">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-60 outline-none transition duration-300 ease-in-out placeholder-gray-400 text-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2 transform translate-x-1 transition duration-300 ease-out">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-60 outline-none transition duration-300 ease-in-out placeholder-gray-400 text-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-extrabold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 text-lg tracking-wide"
        >
          Sign In
        </button>
      </form>
      <p className="mt-8 text-center text-gray-400 text-md">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="text-purple-400 hover:text-purple-300 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 rounded-md px-2 py-1 -mx-2 transition duration-200"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default SignIn;