import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Shield, Key, CheckCircle2, Save, UploadCloud, X, ImageIcon, Settings as SettingsIcon, Loader2 } from 'lucide-react';
import Sidebar from './Sidebar'; 
import axios from "axios";
import Swal from "sweetalert2"

export default function Settings() {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:9000/auth-check", {
        withCredentials: true
      });
      if (res.data.success) {
        const user = res.data.user;
        setUserId(user._id);
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          role: user.role || 'User',
        });
        setExistingImage(user.image);
      }
    } catch (error) {
      console.log("Failed to fetch user", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to Fetch User Data.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (roleValue) => {
    setFormData(prev => ({ ...prev, role: roleValue }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const validateForm = () => {
    const name = String(formData.name || "").trim();
    const email = String(formData.email || "").trim();
    const phone = String(formData.phone || "").trim();

    if (!name) {
      alert("Name is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Invalid email format");
      return false;
    }
    if (phone && !/^[0-9]{10}$/.test(phone)) {
      alert("Phone must be exactly 10 digits");
      return false;
    }

    return true;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("role", formData.role);
      
      if (image) {
        data.append("image", image);
      }

      const res = await axios.put(`http://localhost:9000/user/${userId}`, data, { withCredentials: true });
      
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile Updated Successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      setExistingImage(res.data.user.image); 
      setImage(null);
      setImagePreview(null);
      navigate("/")
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to Update Profile.",
      });
    }
  };

  const roles = [
    { id: 'user', title: 'Standard User', desc: 'Basic access to view assigned tasks and manage personal profile.' },
    { id: 'manager', title: 'Manager', desc: 'Can oversee specific teams, view departmental reports, and approve requests.' },
    { id: 'admin', title: 'Administrator', desc: 'Standard access to manage users, view all analytics, and update content.' },
    { id: 'superadmin', title: 'Super Admin', desc: 'Unrestricted system access. Can manage billing, security, and other admins.' }
  ];

  const displayImage = imagePreview || (existingImage ? `http://localhost:9000${existingImage}` : null);

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
          <div className="mb-8 flex justify-between">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile Settings</h1>
                <p className="text-sm text-gray-500 mt-1.5">Manage your personal information, system access, and preferences.</p>
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
                Save Changes
              </button>
            </div>
          </div>

          <form className="space-y-6">
            
            {/* Section 1: Personal Information */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 lg:p-8 transition-shadow hover:shadow-md">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <SettingsIcon size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2" htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2" htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input type="email" id="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      placeholder="john@example.com" disabled
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all hover:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Phone size={18} />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2" htmlFor="role">
                    Role
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <input
                      type="text" disabled
                      value={formData.role}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all hover:cursor-not-allowed "
                    />
                  </div>
                </div>
              </div>

              {/* Profile Picture Upload Section (Integrated cleanly into personal info) */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">
                  Profile Picture
                </label>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  
                  {/* Preview Avatar */}
                  <div className="relative shrink-0 w-24 h-24 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden group">
                    {displayImage ? (
                      <>
                        <img src={displayImage} alt="Profile preview" className="w-full h-full object-cover" />
                        
                        {/* Only show remove button if it's a new unsaved image preview */}
                        {imagePreview && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button type="button"
                              onClick={removeImage}
                              className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                              title="Remove new image"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <ImageIcon size={32} className="text-gray-400" />
                    )}
                  </div>

                  {/* Upload Zone */}
                  <div className="flex-1 w-full">
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-blue-50/50 hover:border-blue-400 cursor-pointer transition-all group"
                    >
                      <div className="flex flex-col items-center justify-center py-4 px-2 text-center">
                        <UploadCloud size={24} className="text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold text-blue-600">Click to upload new image</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                      </div>
                      <input
                        id="image-upload"
                        name="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Section 2: Role & Permissions */}
            {/* <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 lg:p-8 transition-shadow hover:shadow-md">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <Key size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Role & Permissions</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Update the organizational access level for this account.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((r) => {
                  const isActive = formData.role === r.id;
                  return (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => handleRoleSelect(r.id)}
                      className={`h-full relative flex flex-col text-left p-5 rounded-xl border-2 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                        isActive 
                          ? 'border-blue-600 bg-blue-50/30' 
                          : 'border-gray-100 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full mb-2">
                        <div className="flex items-center gap-2.5">
                          <Shield size={18} className={`shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                          <h3 className={`font-semibold text-sm ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                            {r.title}
                          </h3>
                        </div>
                        {isActive ? (
                          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-200 shrink-0" />
                        )}
                      </div>
                      <p className={`text-sm pl-7 ${isActive ? 'text-blue-700/80' : 'text-gray-500'}`}>
                        {r.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div> */}
          </form>
        </div>
      </main>
    </div>
  );
}