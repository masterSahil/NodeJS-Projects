import React, { useEffect, useState } from "react";
import { Layers3, Save } from "lucide-react";
import Sidebar from "../Sidebar";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditExtraSubCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [formData, setFormData] = useState({
    categoryId: "",
    subCategoryId: "",
    extraCategory: "",
    isActive: true,
  });

  useEffect(() => {
    getCategories();
    getSubCategories();
    getExtraCategory();
  }, []);

  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:9000/category");
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubCategories = async () => {
    try {
      const res = await axios.get("http://localhost:9000/subcategory");
      setSubCategories(res.data.subCategory);
    } catch (error) {
      console.log(error);
    }
  };

  const getExtraCategory = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/extra-category/${id}`);
      setFormData({
        categoryId: res.data.extraCategories.categoryId?._id || "",
        subCategoryId: res.data.extraCategories.subCategoryId?._id || "",
        extraCategory: res.data.extraCategories.extraCategory || "",
        isActive: res.data.extraCategories.isActive,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load extra category",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/extra-category/${id}`, formData);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Extra Category updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/extra-categories/view");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  const filteredSubCategories = subCategories.filter((item) => item.categoryId?._id === formData.categoryId);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-8">

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Layers3 className="text-blue-600" size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Edit Extra Category
              </h1>

              <p className="text-sm text-gray-500">
                Update extra category details
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Category
              </label>

              <select
                required
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categoryId: e.target.value,
                    subCategoryId: "",
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">-- Select Category --</option>

                {categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Sub Category
              </label>

              <select
                required
                value={formData.subCategoryId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subCategoryId: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">-- Select Sub Category --</option>

                {filteredSubCategories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.subcategory}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Extra Category Name
              </label>

              <input
                type="text"
                required
                value={formData.extraCategory}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    extraCategory: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter extra category"
              />
            </div>

            <button type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg">
              <Save size={18} />
              Update Extra Category
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}