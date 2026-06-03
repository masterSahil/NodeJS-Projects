import React, { useEffect, useState } from "react";
import { Layers3, Save, IndianRupee, Info, Hash } from "lucide-react";
import Sidebar from "../Sidebar";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddExtraCategory() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [extraSubCategories, setExtraSubCategories] = useState([]);

  const [formData, setFormData] = useState({
    productCategory: "",
    productSubCategory: "",
    productName: "",
    price: "",
    isActive: true,
  });

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchExtraSubCategories();
  }, []);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:9000/category");
      setCategories(res.data.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get("http://localhost:9000/subcategory");
      setSubCategories(res.data.subCategory || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExtraSubCategories = async () => {
    try {
      const res = await axios.get("http://localhost:9000/extra-category");
      setExtraSubCategories(res.data.extraCategories || []);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredSubCategories = subCategories.filter(
    (sub) => sub.categoryId?._id === formData.productCategory
  );

  const filteredExtraSubCategories = extraSubCategories.filter(
    (esub) => esub.subCategoryId?._id === formData.productSubCategory
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/products", formData);

      setFormData({
        productCategory: "",
        productSubCategory: "",
        productName: "",
        price: "",
        isActive: true,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Extra Category added successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/products/view");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6 lg:p-10">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-8 transition-all">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 pb-5 border-b border-gray-50">
            <div className="w-12 h-12 rounded-xl bg-indigo-50/80 flex items-center justify-center border border-indigo-100/50">
              <Layers3 className="text-indigo-600" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Add Extra Category
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Create and configure a new extra category for your products.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Category
                </label>
                <select 
                  required 
                  value={formData.productCategory}
                  onChange={(e) => setFormData({...formData, productCategory: e.target.value, productSubCategory: "", productName: "" })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-700">
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.category}</option>
                  ))}
                </select>
              </div>

              {/* Sub Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Sub Category
                </label>
                <select 
                  required 
                  value={formData.productSubCategory}
                  onChange={(e)=>setFormData({...formData, productSubCategory: e.target.value, productName: "" })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-700"
                >
                  <option value="">-- Select Sub Category --</option>
                  {filteredSubCategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>{sub.subcategory}</option>
                  ))}
                </select>
              </div>

              {/* Extra Sub Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Extra Sub Category
                </label>
                <select 
                  required 
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-700">
                  <option value="">-- Select Extra Sub Category --</option>
                  {filteredExtraSubCategories.map((esub) => (
                    <option key={esub._id} value={esub._id}>{esub.extraCategory}</option>
                  ))}
                </select>
              </div>

              {/* Pricing */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pricing
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IndianRupee size={16} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input 
                    type="number" 
                    min="0" 
                    required 
                    placeholder="0.00" 
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-700"
                  />
                </div>
              </div>
            </div>
              
            {/* Status (Locked to Active) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>

              <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-gray-50">
                <div>
                  <p className="font-medium text-gray-800">Active</p>
                  <p className="text-sm text-gray-500">Extra categories are active by default</p>
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
            <div className="pt-4 mt-2">
              <button 
                type="submit"
                className="w-full md:px-10 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium py-3 rounded-xl transition-all shadow-sm hover:shadow"
              >
                <Save size={18} />
                Save Category
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}