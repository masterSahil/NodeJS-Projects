import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Key, Save, Eye, EyeOff, Loader2 } from 'lucide-react';
import Sidebar from './Sidebar';
import axios from "axios";
import Swal from 'sweetalert2';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:9000/auth-check", {
          withCredentials: true
        });
        if (res.data.success) {
          setUserId(res.data.user._id);
        } else {
          navigate('/'); 
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Something went wrong",
        });
        console.log("Failed to authenticate", error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = () => {
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword) {
      Swal.fire({
        icon: "warning", title: "Warning",
        text: "Please enter your current password.",
      });
      return false;
    }
    if (newPassword.length < 6) {
      Swal.fire({
        icon: "warning", title: "Warning",
        text: "New password must be at least 6 characters long.",
      });
      return false;
    }
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "warning", title: "Warning",
        text: "New password and confirm password do not match.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await axios.patch(`http://localhost:9000/users/${userId}/password`, {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      }, { withCredentials: true });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password Updated Successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      navigate("/")
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to Update Password.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full bg-gray-50/50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gray-50/50 overflow-hidden">
      
      {/* Sidebar Component */}
      <div className="h-full shrink-0">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto p-4 lg:p-8">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Page Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Security Settings</h1>
              <p className="text-sm text-gray-500 mt-1.5">Update your password to keep your account secure.</p>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <Link
                to="/"
                className="px-6 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2">
                Cancel
              </Link>
              <button onClick={handleSubmit}
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98]">
                <Save size={18} />
                Update Password
              </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Password Form Section */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 lg:p-8 transition-shadow hover:shadow-md">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Lock size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Ensure your account is using a long, random password to stay secure.</p>
                </div>
              </div>

              <div className="space-y-6 ">
                
                {/* Current Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2" htmlFor="currentPassword">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Key size={18} />
                    </div>
                    <input
                      type={showPassword.current ? "text" : "password"}
                      id="currentPassword"
                      name="currentPassword"
                      required
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="Enter current password"
                      className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => toggleVisibility('current')}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    >
                      {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-100 my-2"></div>

                {/* New Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2" htmlFor="newPassword">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword.new ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      required
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => toggleVisibility('new')}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    >
                      {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2" htmlFor="confirmPassword">
                    Confirm New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => toggleVisibility('confirm')}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    >
                      {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 mt-2 font-medium">Passwords do not match.</p>
                  )}
                </div>

              </div>
            </div>
            
          </form>
        </div>
      </main>
    </div>
  );
}