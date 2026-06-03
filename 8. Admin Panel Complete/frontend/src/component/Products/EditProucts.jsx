import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar";
import { ArrowLeft, Save, Upload, Image as ImageIcon } from "lucide-react";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    productCategory: "",
    productSubCategory: "",
    price: "",
    stock: "",
    isActive: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, [id]);

  const fetchInitialData = async () => {
    try {
      // Fetch Product Details
      const productRes = await axios.get(`http://localhost:9000/products/${id}`);
      const product = productRes.data.product || productRes.data;

      setFormData({
        title: product.title || "",
        description: product.description || "",
        productCategory: product.productCategory?._id || product.productCategory || "",
        productSubCategory: product.productSubCategory?._id || product.productSubCategory || "",
        price: product.price || "",
        stock: product.stock || "",
        isActive: product.isActive ?? true,
      });

      if (product.image) {
        setImagePreview(product.image);
      }

      const [catRes, subCatRes] = await Promise.all([
        axios.get("http://localhost:9000/category").catch(() => ({ data: [] })),
        axios.get("http://localhost:9000/subcategory").catch(() => ({ data: [] }))
      ]);

      setCategories(catRes.data.categories || []);
      setSubCategories(subCatRes.data.subCategory || []);
      console.log(subCatRes.data.subCategory)

      setLoading(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load product details",
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("productCategory", formData.productCategory);
      submitData.append("productSubCategory", formData.productSubCategory);
      submitData.append("price", formData.price);
      submitData.append("stock", formData.stock);
      submitData.append("isActive", formData.isActive);
      
      if (imageFile) {
        submitData.append("image", imageFile);
      }

      const res = await axios.put(`http://localhost:9000/products/${id}`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      console.log(res.data)
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update product",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#f8fafc] items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/products" className="p-2 bg-white rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-500 mt-1">Update existing product details</p>
          </div>
        </div>

        {/* FORM CONTAINER */}
        <div className="max-w-7xl bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 shrink-0 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden relative group">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="text-gray-400" size={32} />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="text-white" size={24} />
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-sm font-medium text-gray-900">Upload new image</h3>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG or WEBP up to 5MB.</p>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* General Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Title *</label>
                <input 
                  type="text" 
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Enter product title"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  placeholder="Enter product description"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select 
                  name="productCategory"
                  required
                  value={formData.productCategory}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                <select 
                  name="productSubCategory"
                  value={formData.productSubCategory}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                >
                  <option value="">Select Subcategory</option>
                  {subCategories.filter((sub) => sub.categoryId?._id === formData.productCategory)
                  .map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.subcategory}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
                <input 
                  type="number" 
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Units *</label>
                <input 
                  type="number" 
                  name="stock"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="0"
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Status Toggle & Submit */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Active Status</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-500 transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                </label>
              </div>

              <div className="flex gap-3">
                <Link to="/products" className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </Link>
                <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}