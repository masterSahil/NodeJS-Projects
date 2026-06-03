import React, { useEffect, useState } from "react";
import { Layers3, Save, IndianRupee } from "lucide-react";
import Sidebar from "../Sidebar";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    fetchProductDetails();
  }, []);

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

  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/products/${id}`);
      const product = res.data.product || res.data; 
      
      setFormData({
        productCategory: product.productCategory?._id || product.productCategory || "",
        productSubCategory: product.productSubCategory?._id || product.productSubCategory || "",
        productName: product.productName?._id || product.productName || "",
        price: product.price || "",
        isActive: product.isActive !== undefined ? product.isActive : true,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load product details",
      });
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
      await axios.put(`http://localhost:9000/products/${id}`, formData);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product updated successfully",
        timer: 1500,
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
              <h1 className="text-xl font-bold text-gray-800">Edit Product</h1>
              <p className="text-sm text-gray-500 mt-0.5">Update the configuration for this product.</p>
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
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-700">
                  <option value="">-- Select Sub Category --</option>
                  {filteredSubCategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>{sub.subcategory}</option>
                  ))}
                </select>
              </div>

              {/* Extra Sub Category (Product Name) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Extra Sub Category (Name)
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
              
            {/* Status Checkbox */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-gray-50">
                <div>
                  <p className="font-medium text-gray-800">Active</p>
                  <p className="text-sm text-gray-500">Determine if this product is visible</p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.isActive} 
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 mt-2">
              <button type="submit" className="w-full md:px-10 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium py-3 rounded-xl transition-all shadow-sm hover:shadow">
                <Save size={18} /> Update Product
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}