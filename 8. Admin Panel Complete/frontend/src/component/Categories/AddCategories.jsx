import React, { useState } from "react";
import { FolderPlus, Save } from "lucide-react";
import Sidebar from "../Sidebar";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const [formData, setFormData] = useState({
    category: "",
    isActive: true,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/category", formData);

      setFormData({category: ""});
      Swal.fire({
        icon: "success", title: "Success",
        text: "Category added successfully",
        timer: 2000, showConfirmButton: false,
      });
      navigate("/categories/view")
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error", title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <FolderPlus className="text-blue-600" size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900"> Add Category </h1>
              <p className="text-sm text-gray-500"> Create a new category for your CMS </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category Name
              </label>

              <input type="text" placeholder="Enter category name"
                required value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3"> Status </label>
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-gray-50">
                <div>
                  <p className="font-medium text-gray-800"> Active </p>
                  <p className="text-sm text-gray-500"> Categories are active by default </p>
                </div>

                {/* Disabled Toggle */}
                <div className="relative inline-flex items-center cursor-not-allowed">
                  <input type="checkbox" checked={true} disabled className="sr-only"/>

                  <div className="w-11 h-6 bg-blue-600 rounded-full relative">
                    <div className="absolute top-0.5 right-0.5 bg-white w-5 h-5 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
              <Save size={18} /> Save Category
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}