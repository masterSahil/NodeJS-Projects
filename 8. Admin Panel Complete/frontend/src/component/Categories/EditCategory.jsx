import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

export default function EditCategory() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const getSingleCategory = async () => {
    try {
      const res = await axios.get("http://localhost:9000/category");
      const singleCategory = res.data.categories.find((item) => item._id === id);
      if (singleCategory) {
        setFormData({ category: singleCategory.category });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch category",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`http://localhost:9000/category/${id}`, formData);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Category updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/categories/view");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update category",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleCategory();
  }, []);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900"> Edit Category </h1>
            <p className="text-gray-500 mt-1"> Update category information </p>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="max-w-7xl bg-white mx-auto border border-gray-200 rounded-lg p-8 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3"> Category Name </label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Enter category name" required className="w-full px-5 py-4 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"/>
            </div>

            <button type="submit" disabled={loading} className="mt-8 w-full flex items-center justify-center gap-2 px-5 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all disabled:opacity-50">
              <Save size={18} /> {loading ? "Updating..." : "Update Category"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}