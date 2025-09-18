import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '../Context/authContext';


export default function Login() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, setUser, setIsLoggedIn, isLoggedIn} = useAuth();
  const router = useRouter();
  const handleSubmit = (e) => {
  e.preventDefault();

  axios.post('http://localhost:5000/api/users/login', { userName, email, password })
    .then((res) => {
      if (res.data.message === 'Login successful') {
        setUser(res.data.user);
        console.log(res.data.user);
        router.push('/');
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      } else {
        alert(res.data.message); // Show error message from backend
      }
    })
    .catch((err) => {
      console.log(err);
      alert('❌ Login failed');
    });
};

  const handleHome = () => {
    router.push("/")
  };

  function handleSignUpClick(){
    router.push("/SignUp")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-gradient-to-br bg-blue-600 p-10 rounded-3xl shadow-2xl flex flex-col min-w-[340px] w-full max-w-md border border-blue-100">
        <div className="flex flex-col items-center mb-8">
          {/* <img src="https://img.icons8.com/fluency/96/000000/user-shield.png" alt="Login Icon" className="mb-2" /> */}
          <h1 className="text-3xl font-extrabold text-white mb-1 tracking-wide">Welcome Back!</h1>
          <p className="text-blue-100 text-sm">Log in to your IPM Stores account</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-indigo-700 py-3 rounded-lg text-base font-semibold shadow-lg hover:bg-blue-100 transition-colors duration-300 mt-2"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-blue-100 text-sm">Don't have an account?</span>
          <a onClick={handleSignUpClick} className="text-white font-semibold ml-2 hover:underline cursor-pointer">Sign Up</a>
        </div>
        <button
          onClick={handleHome}
          className="mt-6 w-full bg-white text-blue-600 py-2 rounded-lg font-semibold  hover:bg-blue-600 hover:text-white hover:border-white hover:border-1 transition-colors duration-300"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}

