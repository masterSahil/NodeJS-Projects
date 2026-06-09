import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, MoreVertical, Shield, User, Key, Edit, Trash2, LayoutGrid, List, Table2 } from 'lucide-react';
import Sidebar from '../Sidebar'; 
import axios from 'axios';
import Swal from 'sweetalert2';

export default function UserList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mockUsers, setMockUsers] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null); 
  const [viewMode, setViewMode] = useState('list');

  const getRoleBadge = (role) => {
    const safeRole = role || 'User';
    switch (safeRole) {
      case 'Super Admin':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200/50"><Key size={12}/> {safeRole}</span>;
      case 'Administrator':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/50"><Shield size={12}/> {safeRole}</span>;
      case 'Manager':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/50"><Shield size={12}/> {safeRole}</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"><User size={12}/> {safeRole}</span>;
    }
  };

  const getSafeUserData = (user) => {
    const emailStr = user.email || '';
    const fallbackName = emailStr.split('@')[0] || 'Unknown';
    const displayName = user.name || fallbackName;
    const initials = displayName.substring(0, 2).toUpperCase();
    
    return {
      ...user,
      displayName,
      initials,
      displayPhone: user.phone || '—',
      displayRole: user.role || 'User'
    };
  };

  const getData = async () => {
    try {
        const res = await axios.get("http://localhost:9000/user");
        setMockUsers(res.data.user);
    } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Failed to Fetch Users Data.",
        });
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.put(`http://localhost:9000/user-delete/${id}`);
      setMockUsers(mockUsers.filter(user => (user._id || user.id) !== id));
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User Deleted successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to delete user.",
      });
    }
    setOpenMenuId(null);
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredUsers = mockUsers.filter(u => {
    const safeUser = getSafeUserData(u);
    return safeUser.displayName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="flex h-screen w-full bg-gray-50/50 overflow-hidden">
      <div className="h-full shrink-0">
        <Sidebar />
      </div>
      
      <main className="flex-1 h-full overflow-y-auto p-4 lg:p-8">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pt-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Users</h1>
              <p className="text-sm text-gray-500 mt-1.5">Manage all users from here</p>
            </div>
            <Link to="/users/add" 
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-sm focus:ring-2 focus:ring-blue-500 shrink-0" >
              <Plus size={18} />
              Add New User
            </Link>
          </div>

          {/* Search & View Toggle Toolbar */}
          <div className="bg-white p-2.5 rounded-lg border border-gray-200/80 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search user..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm" 
              />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setViewMode("list")} className={`p-3 rounded-md transition-all 
                  ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                <Table2 size={18} />
              </button>

              <button onClick={() => setViewMode("grid")} className={`p-3 rounded-md transition-all 
                  ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                <LayoutGrid size={18} />  
              </button>
            </div>
          </div>

          {/* Content Area */}
          {viewMode === 'list' ? (
            <div className="bg-white rounded-lg border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
              <div className="min-h-75 overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-white text-xs font-semibold text-gray-500 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Phone Number</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100/80">
                    {filteredUsers.map((user, key) => {
                      const safeData = getSafeUserData(user);
                      const userId = user._id || user.id || key;
                      
                      return (
                      <tr key={userId} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-blue-600 flex items-center justify-center text-white font-semibold">
                              {user.image ? (
                                <img src={`http://localhost:9000${user.image}`} alt={safeData.displayName} className="w-full h-full object-cover" />
                              ) : safeData.initials}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{safeData.displayName}</div>
                              <div className="text-gray-400 text-xs mt-0.5">User Account</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getRoleBadge(safeData.displayRole)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{safeData.displayPhone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/users/edit/${userId}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-md hover:bg-blue-100 transition-colors">
                              <Edit size={14} /> Edit
                            </Link>
                            <button onClick={() => handleDelete(userId)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-md hover:bg-red-100 transition-colors">
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user, key) => {
                const safeData = getSafeUserData(user);
                const userId = user._id || user.id || key;

                return (
                  <div key={userId} className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                        {user.image ? <img src={`http://localhost:9000${user.image}`} alt={safeData.displayName} className="w-full h-full object-cover" /> : safeData.initials}
                      </div>
                      
                      {/* Grid 3-Dot Menu */}
                      <div className="relative">
                        <button onClick={() => setOpenMenuId(openMenuId === userId ? null : userId)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={18} />
                        </button>
                        {openMenuId === userId && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)}></div>
                            <div className="absolute right-0 top-8 mt-1 w-32 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden text-left animate-in fade-in">
                               <Link to={`/users/edit/${userId}`} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                                  <Edit size={14} /> <span>Edit</span>
                               </Link>
                               <button onClick={() => handleDelete(userId)} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-50">
                                  <Trash2 size={14} /> <span>Delete</span>
                               </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900">{safeData.displayName}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Role</span>
                        {getRoleBadge(safeData.displayRole)}
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Phone</span>
                        <span className="font-medium text-gray-700">{safeData.displayPhone}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}