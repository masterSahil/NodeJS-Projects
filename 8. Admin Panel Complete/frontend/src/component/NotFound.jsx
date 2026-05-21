import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        {/* Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6">
          <AlertTriangle size={42} className="text-blue-600" />
        </div>

        {/* 404 */}
        <h1 className="text-7xl font-extrabold text-gray-900 tracking-tight">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          Page not found
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-500 leading-relaxed">
          The page you're looking for doesn’t exist or may have been moved.
          Please check the URL or return to the dashboard.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition" >
            <Home size={18} />
            Go Dashboard
          </Link>

          <button onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition" >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>

        {/* Footer Branding */}
        <div className="mt-12 text-sm text-gray-400">
          Apex CMS • Smart Admin Dashboard
        </div>
      </div>
    </div>
  );
}