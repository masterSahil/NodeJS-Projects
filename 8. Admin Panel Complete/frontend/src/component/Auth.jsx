import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const api = "http://localhost:9000";

  const Signup = async () => {
    try {
      await axios.post(`${api}/signup`, {email, password}, {withCredentials: true});

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Account Created successfully. Please Login to Access Portal.",
        timer: 2000,
        showConfirmButton: false,
      });
      setEmail("");
      setPassword("");
      setIsLogin(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  const Login = async () => {
    try {
      await axios.post(`${api}/login`, {email, password}, {withCredentials: true});

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      setEmail("");
      setPassword("");
      navigate('/');
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
      console.log(error);      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      Login();
    } else {
      Signup();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans text-gray-900 bg-linear-to-br from-slate-50 via-gray-100 to-blue-50 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-white/40 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>

      {/* Main Card Container (Glassmorphism UI) */}
      <div className="relative z-10 max-w-md w-full bg-white/70 backdrop-blur-xl rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 p-8 sm:p-10 transition-all duration-300">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600 text-white mb-5 shadow-lg shadow-blue-500/30">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-800">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            {isLogin
              ? 'Please enter your details to sign in.'
              : 'Join us today! Start your journey here.'}
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
          </label>
          <div>
            <div className="relative">
              <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none 
                ${isLogin && "-top-8"}`}>
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
                placeholder="••••••••"
              />
              {isLogin && (
                <div className="text-right mt-2">
                  <button type="button" onClick={()=>navigate("/forgot-password")} className="text-sm text-blue-600 hover:underline">
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>
          </div>

          <button type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-sm shadow-blue-500/30 transition-all active:scale-[0.98] mt-2">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-8 text-center text-sm">
          <span className="text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-semibold hover:text-blue-700 hover:underline underline-offset-4 focus:outline-none transition-colors"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}