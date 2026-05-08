import React from 'react';
import { Home, ArrowLeft, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center flex flex-col items-center">
        
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <FileQuestion className="text-blue-600" size={40} strokeWidth={1.5} />
        </div>

        <h1 className="text-7xl font-extrabold text-gray-900 tracking-tight mb-2">
          404
        </h1>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Page not found
        </h2>
        <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
          The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button 
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
          
          <button onClick={() => window.location.href = '/'} 
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Home size={16} />
            <span>Dashboard</span>
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-400 font-medium">
        Apex Corporate Management 
      </div>
    </div>
  );
}