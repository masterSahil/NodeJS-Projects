import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, MoreVertical, Filter, Shield, User, Key, Edit, Trash2 } from 'lucide-react';
import Sidebar from './Sidebar'; 
import axios from 'axios';
import Swal from 'sweetalert2';

export default function UserList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mockUsers, setMockUsers] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null); 

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Super Admin':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200/50"><Key size={12}/> {role}</span>;
      case 'Administrator':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/50"><Shield size={12}/> {role}</span>;
      case 'Manager':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/50"><Shield size={12}/> {role}</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"><User size={12}/> {role}</span>;
    }
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
          text: error.response?.data?.message || "Failed to Fetch Users Datas.",
        });
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/user/${id}`);
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

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex h-screen w-full bg-gray-50/50 overflow-hidden">
      
      <div className="h-full shrink-0">
        <Sidebar />
      </div>
      
      <main className="flex-1 h-full overflow-y-auto p-4 lg:p-8">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pt-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Management</h1>
              <p className="text-sm text-gray-500 mt-1.5">View, manage, and configure system access for all team members.</p>
            </div>
            <Link
              to="/users/add" 
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98] shrink-0"
            >
              <Plus size={18} />
              Add New User
            </Link>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
            
            {/* Responsive Table Wrapper */}
            <div className=" min-h-75">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50/50 text-xs uppercase font-semibold text-gray-500 tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Phone Number</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/80">
                  {mockUsers.map((user, key) => {
                    const userId = user._id || user.id || key;
                    
                    return (
                    <tr key={userId} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0">
                            {user.image ? (
                              <img
                                src={`http://localhost:9000${user.image}`}
                                alt={user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                                {user.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U'}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{user.name}</div>
                            <div className="text-gray-500 text-xs mt-0.5">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.phone}
                      </td>
                      
                      {/* Updated Actions Column */}
                      <td className="px-6 py-4 whitespace-nowrap text-right relative">
                        <button 
                          onClick={() => toggleMenu(userId)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {/* Dropdown Menu implementation */}
                        {openMenuId === userId && (
                          <>
                            {/* Invisible overlay to catch clicks outside the menu */}
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setOpenMenuId(null)}
                            ></div>
                            
                            {/* Dropdown panel */}
                            <div className="absolute right-8 top-10 mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-100">
                               <Link 
                                  to={`/users/edit/${userId}`}
                                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                               >
                                  <Edit size={14} /> 
                                  <span>Edit</span>
                               </Link>
                               <button 
                                  onClick={() => handleDelete(userId)}
                                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50"
                               >
                                  <Trash2 size={14} /> 
                                  <span>Delete</span>
                               </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>

            {/* Pagination / Footer */}
            <div className="p-4 lg:px-6 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between text-sm text-gray-500">
              <div>Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">{mockUsers.length}</span> of <span className="font-medium text-gray-900">{mockUsers.length}</span> users</div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors bg-white">Next</button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}