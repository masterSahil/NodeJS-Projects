import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ResetPassword() {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const otp = location.state?.otp;

  const api = "http://localhost:9000";

  useEffect(() => {
    if (!email || !otp) {
      navigate('/forgot-password');
    }
  }, [email, otp, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill all fields",
      });
    }

    if (newPassword.length < 6) {
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters",
      });
    }

    if (newPassword !== confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match",
      });
    }

    setIsLoading(true);

    try {
        const response = await axios.post(`${api}/reset-password`, 
        { email, otp, newPassword }, { withCredentials: true });

        Swal.fire({
            icon: "success",
            title: "Password Reset Successful",
            text: response.data.message,
            timer: 2500,
            showConfirmButton: false,
        });

      navigate('/');
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Reset Failed",
            text:
            error.response?.data?.message ||
            "Something went wrong",
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-gray-100 p-4 overflow-hidden relative">

      {/* Background Blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <div className="w-13 h-13 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 15v2m6-6V9a6 6 0 10-12 0v2m-2 0h16a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5a2 2 0 012-2z" />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            Reset Password
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Create a new secure password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleResetPassword} className="space-y-5" >

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>

            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />

              <button type="button" onClick={() => setShowPassword(!showPassword) }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />

              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center">

            {isLoading ? (

              <>
                <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" >
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Updating...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <button onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-all" >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}