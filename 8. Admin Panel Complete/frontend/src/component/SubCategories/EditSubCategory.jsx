import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { Save } from "lucide-react";

export default function EditSubCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    categoryId: "",
    subcategory: "",
    isActive: true,
  });

  const getData = async () => {
    try {
      const [subRes, catRes] = await Promise.all([
        axios.get("http://localhost:9000/subcategory"),
        axios.get("http://localhost:9000/category"),
      ]);

      setCategories(catRes.data.categories);
      const singleSubCategory = subRes.data.subCategory.find((item) => item._id === id);

      if (singleSubCategory) {
        setFormData({
          categoryId: singleSubCategory.categoryId?._id || "",
          subcategory: singleSubCategory.subcategory || "",
          isActive: singleSubCategory.isActive,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch sub category",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`http://localhost:9000/subcategory/${id}`, formData);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Sub Category updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/sub-categories/view");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update sub category",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Sub Category
          </h1>
          <p className="text-gray-500 mt-1">
            Update sub category information
          </p>
        </div>

        <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Category
              </label>

              <select name="categoryId" value={formData.categoryId} onChange={handleChange} required
                className="w-full px-5 py-4 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Category</option>
                {categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sub Category Name
              </label>

              <input type="text" name="subcategory" value={formData.subcategory} onChange={handleChange} 
                placeholder="Enter sub category name" required className="w-full px-5 py-4 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"/>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50">
              <Save size={18} />
              {loading ? "Updating..." : "Update Sub Category"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}