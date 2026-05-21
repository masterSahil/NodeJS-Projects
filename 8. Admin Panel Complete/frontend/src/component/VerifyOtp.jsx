import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function VerifyOtp() {

    const [otp, setOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(120);
    const [isLoading, setIsLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const api = "http://localhost:9000";

    useEffect(() => {
        if (!email) {
            navigate('/forgot-password');
        }
    }, [email, navigate]);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // verify otp
    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        if (timeLeft <= 0) {
            return Swal.fire({
                icon: "error",
                title: "OTP Expired",
                text: "Please resend OTP",
            });
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${api}/verify-otp`, {email, otp}, {withCredentials: true});

            Swal.fire({
                icon: "success",
                title: "Verified",
                text: response.data.message,
                timer: 2000,
                showConfirmButton: false,
            });

            navigate('/reset-password', { state: {email,otp} });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Verification Failed",
                text: error.response?.data?.message || "Invalid OTP",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // resend otp
    const handleResendOtp = async () => {
        setResendLoading(true);
        try {
            await axios.post(`${api}/forgot-password`, {email}, {withCredentials: true});
            setTimeLeft(120);

            Swal.fire({
                icon: "success",
                title: "OTP Resent",
                text: "New OTP sent successfully",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: error.response?.data?.message || "Failed to resend OTP",
            });
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-slate-50 via-blue-50 to-gray-100 overflow-hidden relative">

            {/* Background Blur Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-8">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800"> Verify OTP </h2>

                    <p className="text-gray-500 mt-2 text-sm">
                        Enter the 6-digit OTP sent to your email
                    </p>
                    <p className="text-blue-600 text-sm mt-1 font-medium"> {email} </p>
                </div>

                {/* Timer */}
                <div className="flex justify-center mb-6">
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold 
                    ${timeLeft <= 20 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                        OTP expires in {" "}
                        {Math.floor(timeLeft / 60)}:
                        {String(timeLeft % 60).padStart(2, '0')}
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleVerifyOtp} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2"> OTP Code </label>

                        <input type="text" required maxLength={6} value={otp} disabled={timeLeft <= 0}
                        onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 text-center tracking-[10px] text-xl font-bold outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"/>
                    </div>

                    {/* Verify Button */}
                    <button type="submit" disabled={isLoading || timeLeft <= 0}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center">

                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />

                                    <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                </svg>
                                Verifying...
                            </>
                        ) : (
                            "Verify OTP"
                        )}
                    </button>
                </form>

                {/* Resend */}
                <div className="mt-6 text-center">
                    {timeLeft <= 0 ? (
                        <button onClick={handleResendOtp} disabled={resendLoading}
                            className="text-blue-600 hover:text-blue-800 font-medium transition-all">
                            {resendLoading ? "Resending OTP..." : "Resend OTP"}
                        </button>
                    ) : (
                        <p className="text-sm text-gray-500">
                            Didn't receive OTP? Wait until timer ends
                        </p>
                    )}
                </div>

                {/* Back */}
                <div className="mt-8 text-center">

                    <button onClick={() => navigate('/forgot-password')} className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-all">
                        ← Back
                    </button>
                </div>
            </div>
        </div>
    );
}