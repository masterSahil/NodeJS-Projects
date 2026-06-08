import React, { useState, useEffect } from 'react';
import { Search, LayoutGrid, List, Trash2, RefreshCcw } from 'lucide-react';
import Sidebar from '../Sidebar'; 
import axios from 'axios';
import Swal from 'sweetalert2';

export default function UserTrash() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); 
  const [trashedUsers, setTrashedUsers] = useState([]); 

  const getTrashedData = async () => {
    try {
        const res = await axios.get("http://localhost:9000/trash-users"); 
        setTrashedUsers(res.data.users);
    } catch (error) {
        console.error("Error fetching trashed users:", error);
    }
  }

  useEffect(() => {
    getTrashedData();
  }, []);

  const handleRestore = async (id) => {
    try {
      await axios.patch(`http://localhost:9000/user-restore/${id}`);
      setTrashedUsers(trashedUsers.filter(user => user._id !== id));
      Swal.fire({
        icon: "success",
        title: "Restored",
        text: "User has been restored successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error restoring user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to restore user.",
      });
    }
  };

  const handlePermanentDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/user-permanent/${id}`);
      setTrashedUsers(trashedUsers.filter(user => user._id !== id));
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "User permanently deleted.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error permanently deleting user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete user.",
      });
    }
  };

  const filteredUsers = trashedUsers.filter(u => {
    const nameStr = u.name || '';
    const emailStr = u.email || '';
    return nameStr.toLowerCase().includes(searchTerm.toLowerCase()) || 
           emailStr.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex h-screen w-full bg-gray-50/50 overflow-hidden">
      
      {/* Sidebar */}
      <div className="h-full shrink-0">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto p-4 lg:p-8">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <div className="mb-6 pt-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Trash Users</h1>
            <p className="text-sm text-gray-500 mt-1.5">Restore or permanently delete users</p>
          </div>

          {/* Search & View Toggle Toolbar */}
          <div className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search user..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm" 
              />
            </div>
            <div className="flex border border-gray-100 p-1.5 rounded-lg shrink-0">
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                <List size={20} />
              </button>
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                <LayoutGrid size={20} />
              </button>
            </div>
          </div>

          {/* Content Area */}
          {filteredUsers.length === 0 ? (
            
            // --- EMPTY STATE UI ---
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm flex flex-col items-center justify-center p-12 min-h-100">
              <div className="w-20 h-20 mb-4 flex items-center justify-center text-gray-300">
                <svg xmlns="http://www.w3.org/Drafts/SVG" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trash Empty</h3>
              <p className="text-gray-500 text-sm">No deleted users found matching your criteria.</p>
            </div>

          ) : (
            
            // --- POPULATED STATE ---
            viewMode === 'list' ? (
               // LIST VIEW
               <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                      <thead className="bg-gray-50/50 text-xs uppercase font-semibold text-gray-500 tracking-wider border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4">User</th>
                          <th className="px-6 py-4">Email</th>
                          <th className="px-6 py-4">Deleted At</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100/80">
                        {filteredUsers.map((user) => (
                          <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.name || 'Unknown User'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.email || '—'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.deletedAt || 'Recently'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                               <div className="flex items-center justify-end gap-2">
                                  <button onClick={() => handleRestore(user._id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-md hover:bg-emerald-100 transition-colors focus:ring-2 focus:ring-emerald-500/20 outline-none">
                                    <RefreshCcw size={14} /> Restore
                                  </button>
                                  <button onClick={() => handlePermanentDelete(user._id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-md hover:bg-red-100 transition-colors focus:ring-2 focus:ring-red-500/20 outline-none">
                                    <Trash2 size={14} /> Delete Forever
                                  </button>
                                </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                 {filteredUsers.map((user) => {
                   const displayName = user.name || (user.email ? user.email.split('@')[0] : 'Unknown');
                   const initials = displayName.substring(0, 2).toUpperCase();
                   
                   return (
                     <div key={user._id} className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col p-5 group">
                        
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-lg">
                            {user.image ? (
                              <img src={`http://localhost:9000${user.image}`} alt={displayName} className="w-full h-full object-cover" />
                            ) : (
                              initials
                            )}
                          </div>
                          <div className="overflow-hidden">
                            <h3 className="text-base font-bold text-gray-900 truncate" title={displayName}>{displayName}</h3>
                            <p className="text-sm text-gray-500 truncate" title={user.email}>{user.email || 'No email provided'}</p>
                          </div>
                        </div>

                        <div className="mb-5 flex-1">
                          <div className="text-xs text-gray-400 bg-gray-50 inline-block px-2.5 py-1 rounded-md border border-gray-100">
                            Deleted: {user.deletedAt || 'Recently'}
                          </div>
                        </div>

                        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                          <button 
                            onClick={() => handleRestore(user._id)} 
                            className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-lg transition-colors focus:ring-2 focus:ring-emerald-500/20 outline-none"
                          >
                            <RefreshCcw size={16} /> Restore
                          </button>
                          <button 
                            onClick={() => handlePermanentDelete(user._id)} 
                            className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg transition-colors focus:ring-2 focus:ring-red-500/20 outline-none"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>

                     </div>
                   );
                 })}
               </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}