import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UserPlus, Users, Settings, LogOut, ChevronRight } from 'lucide-react';
import axios from "axios";

const SidebarItem = ({ icon: Icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        <span className="font-medium text-sm">{label}</span>
      </div>
    </Link>
  );
};

export default function Sidebar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:9000/auth-check", {
          withCredentials: true
        });
        if (res.data.success) {
          setCurrentUser(res.data.user);
        }
      } catch (error) {
        console.log("Failed to fetch user data:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:9000/logout", {
        withCredentials: true
      });
      navigate("/");  
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getInitials = (text) => {
    if (!text) return "U";
    
    const nameParts = text.split(/[\s._]+/); 
    
    if (nameParts.length > 1 && nameParts[1].length > 0) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return text.substring(0, 2).toUpperCase();
  };

  const displayName = currentUser?.name ? currentUser.name : currentUser?.email?.split('@')[0] || "Loading...";

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-slate-950 text-white border-r border-slate-800 relative h-screen">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="font-bold text-lg">A</span>
        </div>
        <span className="font-bold text-xl tracking-tight">Apex</span>
        <span className="text-xs text-gray-500 uppercase tracking-widest ml-1 mt-1">CMS</span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 scrollbar-hide">
        
        {/* Overview Section */}
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-3 px-3">OVERVIEW</p>
          <div className="space-y-1">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/" />
          </div>
        </div>

        {/* Users Section */}
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-3 px-3">USERS</p>
          <div className="space-y-1">
            <SidebarItem icon={UserPlus} label="Add Form" to="/users/add" />
            <SidebarItem icon={Users} label="View Data" to="/users/view" />
          </div>
        </div>

        {/* System Section */}
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-3 px-3">SYSTEM</p>
          <div className="space-y-1">
            <SidebarItem icon={Settings} label="Settings" to="/settings" />
          </div>
        </div>

      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center justify-between cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            
            {currentUser?.image ? (
              <img src={`http://localhost:9000${currentUser.image}`} alt={displayName} 
                className="w-9 h-9 rounded-full object-cover border border-slate-700"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">
                {currentUser ? getInitials(displayName) : "..."}
              </div>
            )}

            {/* Show Dynamic Name (or Email prefix) and Role */}
            <div>
              <p className="text-sm font-semibold truncate max-w-30">
                {displayName}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {currentUser ? (currentUser.role || "Admin") : "..."}
              </p>
            </div>

          </div>
          <LogOut size={16} onClick={handleLogout}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0" 
          />
        </div>
      </div>
      
      {/* Collapse button */}
      <button className="absolute -right-3 top-6 bg-slate-900 border border-slate-700 rounded-full p-1 text-gray-400 hover:text-white transition-colors hidden lg:block z-10 shadow-md">
         <ChevronRight size={14} />
      </button>
    </aside>
  );
}