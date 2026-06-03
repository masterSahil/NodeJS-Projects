import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar";
import { Search, Plus, MoreVertical, LayoutGrid, Table2, Edit, Trash2, Package } from "lucide-react";

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
        icon: "error", title: "Error",
        text: "Failed to fetch products",
      });
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:9000/products/status/${id}`);

      setProducts((prev) =>
        prev.map((item) => item._id === id ? { ...item, isActive: !currentStatus } : item)
      );

      Swal.fire({
        icon: "success", title: "Updated", timer: 1500,
        text: `Product ${!currentStatus ? "Activated" : "Deactivated"}`,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error", title: "Error",
        text: "Failed to Update status",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:9000/products/${id}`);

      setProducts((prev) => prev.filter((item) => item._id !== id));

      Swal.fire({
        icon: "success", title: "Deleted", timer: 1500,
        text: "Product deleted successfully",
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error", title: "Error",
        text: "Failed to delete product",
      });
    }
  };

  const filteredProducts = products.filter((item) => {
    const title = item.title?.toLowerCase() || "";
    const cat = item.productCategory?.category?.toLowerCase() || "";
    return title.includes(searchTerm.toLowerCase()) || cat.includes(searchTerm.toLowerCase());
  });

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-gray-500 mt-1">Manage all store products</p>
          </div>
          <Link to="/products/add" className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Plus size={18} /> Add Product
          </Link>
        </div>

        {/* SEARCH + VIEW */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="relative w-full lg:max-w-sm">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search products..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setViewType("table")}
                className={`p-3 rounded-md transition-colors ${viewType === "table" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                <Table2 size={18} />
              </button>
              <button onClick={() => setViewType("grid")}
                className={`p-3 rounded-md transition-colors ${viewType === "grid" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* TABLE VIEW */}
        {viewType === "table" && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr className="text-left text-sm text-gray-500">
                    <th className="px-6 py-4">Product Details</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((item) => (
                    <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex shrink-0 items-center justify-center overflow-hidden">
                            {item.image ? (
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                                <Package size={20} />
                            )}
                          </div>
                          <div>
                            <h1 className="font-semibold text-gray-900">{item.title}</h1>
                            <p className="text-sm text-gray-500 truncate max-w-50">{item.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="font-medium text-gray-700">{item.productCategory?.category}</span>
                      </td>
                      <td className="px-6 py-5 font-semibold text-green-600">₹ {item.price}</td>
                      <td className="px-6 py-5 text-gray-700">{item.stock} Units</td>
                      <td className="px-6 py-5">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={item.isActive} className="sr-only peer"
                            onChange={() => toggleStatus(item._id, item.isActive)} />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-500 transition-colors"></div>
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                        </label>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-3">
                          <Link to={`/products/edit/${item._id}`} className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors">
                            <Edit size={16} /> Edit
                          </Link>
                          <button onClick={() => handleDelete(item._id)} className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors">
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-gray-500">No Products Found</td>
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
              <div key={item._id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-16 h-16 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center overflow-hidden">
                    {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                        <Package size={28} />
                    )}
                  </div>
                  <button onClick={() => toggleMenu(item._id)} className="p-1 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-gray-900 truncate">{item.title}</h2>
                <p className="text-sm text-gray-500 mt-1 truncate">{item.productCategory?.category} • {item.productSubCategory?.subcategory}</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="inline-flex px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-bold">
                    ₹ {item.price}
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Stock: {item.stock}
                  </span>
                </div>

                <div className="mt-5 pt-5 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Status</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={item.isActive} className="sr-only peer"
                      onChange={() => toggleStatus(item._id, item.isActive)} />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-500 transition-colors"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </label>
                </div>

                {openMenuId === item._id && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                    <div className="absolute top-14 right-5 w-36 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden">
                      <Link to={`/products/edit/${item._id}`} className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <Edit size={15} /> Edit
                      </Link>
                      <button onClick={() => { handleDelete(item._id); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100 transition-colors">
                        <Trash2 size={15} /> Delete
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