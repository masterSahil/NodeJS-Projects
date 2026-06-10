import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, ChevronRight, ChevronDown, Lock, FolderPlus, FolderOpen, Trash2, Folder, Layers, Grid, Package } from 'lucide-react';
import axios from "axios";
import Swal from 'sweetalert2';

const SidebarItem = ({ icon: Icon, label, to, isNested = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-slate-800 hover:text-white'} ${isNested ? 'ml-6' : ''}`}>
      <div className="flex items-center gap-3">
        {Icon && <Icon size={isNested ? 16 : 18} />}
        <span className={`font-medium ${isNested ? 'text-xs' : 'text-sm'}`}>{label}</span>
      </div>
    </Link>
  );
};

const SidebarDropdown = ({ icon: Icon, label, children, activePaths = [], openMenu, setOpenMenu }) => {
  const location = useLocation();
  const isChildActive = activePaths.some(path => location.pathname.startsWith(path));
  const isOpen = openMenu === label || (openMenu === null && isChildActive);

  const handleToggle = () => {
    if (isOpen) {
      setOpenMenu(""); 
    } else {
      setOpenMenu(label); 
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <button onClick={handleToggle} className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors w-full ${isChildActive && !isOpen ? 'text-white border-l' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}`} >
        <div className="flex items-center gap-3">
          <Icon size={18} />
          <span className="font-medium text-sm">{label}</span>
        </div>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      
      {isOpen && (
        <div className="flex flex-col gap-1 mt-1 border-l border-slate-800 ml-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null); 
  const [openMenu, setOpenMenu] = useState(null);
  const [role, setRole] = useState('user')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:9000/auth-check", { withCredentials: true });
        if (res.data.success) {
          setCurrentUser(res.data.user);
        } 
        setRole(res.data.user.role);
      } catch (error) {
        console.log("Failed to fetch user data:", error);
        if (error.response?.status === 401) {
          window.location.href = "/";
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:9000/logout", { withCredentials: true });
      navigate("/");  
      window.location.reload();
      Swal.fire({
        icon: "success", title: "Success",
        text: "Logout successfully", timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error", title: "Error",
        text: error.response?.data?.message || "Failed to Logout.",
      });
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

  const displayName = currentUser?.name ? currentUser.name: currentUser?.email?.split('@')[0] || "Loading...";

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
        
        {/* Main Section */}
        <div className="space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/" />
        </div>

        {/* Management Section */}
        <div>
          { role === 'manager' || role === 'superadmin' || role ==='admin' &&
            <p className="text-xs font-semibold text-slate-500 mb-3 px-3">MANAGEMENT</p>
          }

          <div className="space-y-2">
            { role === 'superadmin' &&
              <>
                {/* Users */}
                <SidebarDropdown icon={Users} label="Users" activePaths={['/users']} openMenu={openMenu} setOpenMenu={setOpenMenu}>
                  <SidebarItem icon={FolderPlus} label="Add New User" to="/users/add" isNested />
                  <SidebarItem icon={FolderOpen} label="View User Data" to="/users/view" isNested />
                  <SidebarItem icon={FolderOpen} label="Trash Users" to="/users/trash" isNested />
                </SidebarDropdown>
              </>
            }

            { role === 'superadmin' || role ==='admin' && 
              <>
                {/* Categories */}
                <SidebarDropdown icon={Folder} label="Categories" activePaths={['/categories']} openMenu={openMenu} setOpenMenu={setOpenMenu}>
                  <SidebarItem icon={FolderPlus} label="Add Categories" to="/categories/add" isNested />
                  <SidebarItem icon={FolderOpen} label="View Categories" to="/categories/view" isNested />
                  <SidebarItem icon={Trash2} label="Trash" to="/categories/trash" isNested />
                </SidebarDropdown>
              </>
            }

            { role === 'superadmin' || role ==='admin' &&
              <>
                {/* Sub Categories */}
                <SidebarDropdown icon={Layers} label="Sub Categories" activePaths={['/sub-categories']} openMenu={openMenu} setOpenMenu={setOpenMenu}>
                  <SidebarItem icon={FolderPlus} label="Add Sub Categories" to="/sub-categories/add" isNested />
                  <SidebarItem icon={FolderOpen} label="View Sub Categories" to="/sub-categories/view" isNested />
                  <SidebarItem icon={Trash2} label="Trash" to="/sub-categories/trash" isNested />
                </SidebarDropdown>
              </>
            }

            { role === 'superadmin' || role ==='admin' &&
              <>
                {/* Extra Sub Categories */}
                <SidebarDropdown icon={Grid} label="Extra Categories" activePaths={['/extra-categories']} openMenu={openMenu} setOpenMenu={setOpenMenu}>
                  <SidebarItem icon={FolderPlus} label="Add Extra Categories" to="/extra-categories/add" isNested />
                  <SidebarItem icon={FolderOpen} label="View Extra Categories" to="/extra-categories/view" isNested />
                  <SidebarItem icon={Trash2} label="Trash" to="/extra-categories/trash" isNested />
                </SidebarDropdown>
              </>
            }

            { role === 'manager' || role === 'superadmin' || role ==='admin' &&
              <>
                {/* Products */}
                <SidebarDropdown icon={Package} label="Products" activePaths={['/products']} openMenu={openMenu} setOpenMenu={setOpenMenu}>
                  <SidebarItem icon={FolderPlus} label="Add Products" to="/products/add" isNested />
                  <SidebarItem icon={FolderOpen} label="View Products" to="/products/view" isNested />
                  <SidebarItem icon={Trash2} label="Trash" to="/products/trash" isNested />
                </SidebarDropdown>
              </>
            }
          </div>
        </div>

        {/* System Section */}
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-3 px-3">SYSTEM</p>
          <div className="space-y-1">
            <SidebarItem icon={Settings} label="Settings" to="/settings" />
            <SidebarItem icon={Lock} label="Change Password" to="/change-password" />
          </div>
        </div>

      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center justify-between cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition-colors">
          <div onClick={() => navigate("/settings")} className="flex items-center gap-3">
            
            {currentUser?.image ? (
              <img src={`http://localhost:9000${currentUser.image}`} alt={displayName} 
                className="w-9 h-9 rounded-full object-cover border border-slate-700" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">
                {currentUser ? getInitials(displayName) : "..."}
              </div>
            )}

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