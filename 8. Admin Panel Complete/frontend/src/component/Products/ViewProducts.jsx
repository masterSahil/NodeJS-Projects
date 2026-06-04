import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar";
import { Search, Plus, MoreVertical, LayoutGrid, Table2, Edit, Trash2, Layers3, IndianRupee } from "lucide-react";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("table");
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:9000/products");
      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error", 
        title: "Error",
        text: "Failed to fetch products",
      });
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:9000/products/status/${id}`);
      setProducts((prev) =>prev.map((item) => item._id === id ? { ...item, isActive: !currentStatus } : item));

      Swal.fire({
        icon: "success", 
        title: "Updated", 
        timer: 1500,
        text: `Status ${!currentStatus ? "Activated" : "Deactivated"}`,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error", 
        title: "Error",
        text: "Failed to update status",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Record?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.put(`http://localhost:9000/products-delete/${id}`);

      setProducts((prev) => prev.filter((item) => item._id !== id));
      Swal.fire({
        icon: "success", 
        title: "Deleted", 
        timer: 1500,
        text: "Record deleted successfully",
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error", 
        title: "Error",
        text: "Failed to delete record",
      });
    }
  };

  const filteredProducts = products.filter((item) => {
    const name = (item.productName?.extraCategory || item.productName || "").toLowerCase();
    const cat = (item.productCategory?.category || "").toLowerCase();
    const subCat = (item.productSubCategory?.subcategory || "").toLowerCase();
    const term = searchTerm.toLowerCase();
    
    return name.includes(term) || cat.includes(term) || subCat.includes(term);
  });

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto max-w-7xl p-6">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50/80 flex items-center justify-center border border-indigo-100/50">
              <Layers3 className="text-indigo-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">View Products</h1>
              <p className="text-sm text-gray-500 mt-0.5">Manage your configured products and categories</p>
            </div>
          </div>
          <Link to="/products/add" className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium rounded-xl transition-all shadow-sm hover:shadow">
            <Plus size={18} /> Add New
          </Link>
        </div>

        {/* SEARCH + VIEW CONTROLS */}
        <div className="bg-white p-3 rounded-md border border-gray-100 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="relative w-full lg:max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by category, sub-category, or name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-4 text-sm rounded-md border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-700" 
              />
            </div>

            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button onClick={() => setViewType("table")}
                className={`p-2.5 rounded-lg transition-colors ${viewType === "table" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"}`}>
                <Table2 size={18} />
              </button>
              <button onClick={() => setViewType("grid")}
                className={`p-2.5 rounded-lg transition-colors ${viewType === "grid" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"}`}>
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* TABLE VIEW */}
        {viewType === "table" && (
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr className="text-left text-gray-500 font-medium">
                    <th className="px-6 py-4">Product Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Sub Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredProducts.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex shrink-0 items-center justify-center border border-indigo-100/30">
                            <Layers3 className="text-indigo-500" size={18} />
                          </div>
                          <span className="font-semibold text-gray-800">
                            {item.productName?.extraCategory || item.productName || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {item.productCategory?.category || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {item.productSubCategory?.subcategory || "N/A"}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        <div className="flex items-center gap-1">
                          <IndianRupee size={14} className="text-gray-400" />
                          {item.price}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={item.isActive} className="sr-only peer"
                            onChange={() => toggleStatus(item._id, item.isActive)} />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition-colors"></div>
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                        </label>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Link to={`/products/edit/${item._id}`} className="p-3 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                            <Edit size={18} /> 
                          </Link>
                          <button onClick={() => handleDelete(item._id)} className="p-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <Search size={32} className="mb-3 opacity-50" />
                          <p>No records found matching your criteria</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* GRID VIEW */}
        {viewType === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((item) => (
              <div key={item._id} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-all relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100/30">
                     <Layers3 className="text-indigo-500" size={24} />
                  </div>
                  <button onClick={() => toggleMenu(item._id)} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <h2 className="text-lg font-bold text-gray-800 truncate mb-1">
                  {item.productName?.extraCategory || item.productName || "N/A"}
                </h2>
                
                <div className="space-y-1 mb-5">
                  <p className="text-sm text-gray-500 truncate flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> 
                    {item.productCategory?.category || "No Category"}
                  </p>
                  <p className="text-sm text-gray-500 truncate flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> 
                    {item.productSubCategory?.subcategory || "No Sub Category"}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-1 font-bold text-gray-800">
                    <IndianRupee size={16} className="text-gray-500" />
                    {item.price}
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={item.isActive} className="sr-only peer"
                      onChange={() => toggleStatus(item._id, item.isActive)} />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition-colors"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                  </label>
                </div>

                {openMenuId === item._id && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                    <div className="absolute top-16 right-6 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden">
                      <Link to={`/products/edit/${item._id}`} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                        <Edit size={16} /> Edit
                      </Link>
                      <button onClick={() => { handleDelete(item._id); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 border-t border-gray-50 transition-colors">
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}