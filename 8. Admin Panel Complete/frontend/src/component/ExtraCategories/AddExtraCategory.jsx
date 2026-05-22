import React, { useEffect, useState } from "react";
import { Layers3, Save, IndianRupee } from "lucide-react";
import Sidebar from "../Sidebar";
import Swal from "sweetalert2";
import axios from "axios";

export default function AddExtraCategory() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [formData, setFormData] = useState({
    categoryId: "",
    subCategoryId: "",
    extraCategory: "",
    pricing: "",
    isActive: true,
  });

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:9000/category");
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get("http://localhost:9000/subcategory");
      setSubCategories(res.data.subCategory);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredSubCategories = subCategories.filter((sub) => sub.categoryId?._id === formData.categoryId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/extra-category", formData);

      setFormData({
        categoryId: "",
        subCategoryId: "",
        extraCategory: "",
        pricing: "",
        isActive: true,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Extra Category added successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong",
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Layers3 className="text-indigo-600" size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Add Extra Category
              </h1>

              <p className="text-sm text-gray-500">
                Create a new extra category
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" >
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Category
              </label>

              <select required value={formData.categoryId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categoryId: e.target.value,
                    subCategoryId: "",
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                <option value="">
                  -- Select Category --
                </option>

                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Sub Category
              </label>

              <select required value={formData.subCategoryId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subCategoryId: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                <option value="">
                  -- Select Sub Category --
                </option>

                {filteredSubCategories.map((sub) => (
                  <option key={sub._id} value={sub._id} >
                    {sub.subcategory}
                  </option>
                ))}
              </select>
            </div>

            {/* Extra Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Extra Category Name
              </label>

              <input type="text" required placeholder="Enter extra category name"
                value={formData.extraCategory}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    extraCategory: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
            </div>

            {/* Pricing */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pricing
              </label>

              <div className="relative">
                <IndianRupee size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"/>

                <input type="number" min="0" required placeholder="Enter price" value={formData.pricing}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricing: e.target.value,
                    })
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Status
              </label>

              <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-gray-50">
                <div>
                  <p className="font-medium text-gray-800">
                    Active
                  </p>

                  <p className="text-sm text-gray-500">
                    Extra categories are active by default
                  </p>
                </div>

                <div className="relative inline-flex items-center cursor-not-allowed">
                  <input type="checkbox" checked={true} disabled className="sr-only"/>

                  <div className="w-11 h-6 bg-indigo-600 rounded-full relative">
                    <div className="absolute top-0.5 right-0.5 bg-white w-5 h-5 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition" >
              <Save size={18} />
              Save Extra Category
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}