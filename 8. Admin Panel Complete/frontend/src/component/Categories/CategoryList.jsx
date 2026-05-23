import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar";
import { Search, Plus, MoreVertical, LayoutGrid, Table2, Edit, Trash2, Tag } from "lucide-react";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("table");
  const [openMenuId, setOpenMenuId] = useState(null);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:9000/category");

      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch categories",
      });
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const res = await axios.put(`http://localhost:9000/category/${id}`, { isActive: !currentStatus });

      setCategories((prev) => prev.map((item) => item._id === id ? { ...item, isActive: !currentStatus } : item));

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: `Category ${ !currentStatus ? "Activated" : "Deactivated" }`,
        timer: 1500,
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
    try {
      await axios.put(`http://localhost:9000/trash-category/${id}`);

      setCategories(categories.filter((item) => item._id !== id));
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Category deleted successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete category",
      });
    }
  };

  const filteredCategories = categories.filter((item) => item.category.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl font-bold"> Categories </h1>
            <p className="text-gray-500 mt-1">Manage all categories from here</p>
          </div>

          <Link to="/categories/add" className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg transition-all w-fit">
            <Plus size={18} />
            Add Category
          </Link>
        </div>

        {/* TOP BAR */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="relative w-full lg:max-w-sm">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

              <input type="text" placeholder="Search category..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value) }
                className="w-full pl-11 pr-4 py-3 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-black" />
            </div>

            {/* VIEW TOGGLE */}
            <div className="flex items-center gap-2">
              <button onClick={() => setViewType("table")} className={`p-3 rounded-md transition-all 
                  ${viewType === "table" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                <Table2 size={18} />
              </button>

              <button onClick={() => setViewType("grid")} className={`p-3 rounded-md transition-all 
                  ${viewType === "grid" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                <LayoutGrid size={18} />  
              </button>
            </div>
          </div>
        </div>

        {/* TABLE VIEW */}
        {viewType === "table" && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm ">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr className="text-left text-sm text-gray-500">
                    <th className="px-6 py-4">
                      Category
                    </th>
                    <th className="px-6 py-4">
                      Status
                    </th>
                    <th className="px-6 py-4">
                      Created
                    </th>
                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCategories.map((item) => (
                    <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                      {/* CATEGORY */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                            {item.category[0]}
                          </div>

                          <div>
                            <h1 className="font-semibold text-gray-900">
                              {item.category}
                            </h1>

                            <p className="text-sm text-gray-500">
                              Category Item
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={item.isActive} className="sr-only peer"
                          onChange={() => toggleStatus(item._id, item.isActive)} />

                          <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full
                            peer peer-checked:bg-blue-500 transition-all"></div>

                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-6"></div>
                        </label>
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-5 text-gray-600">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-3">
                          <Link to={`/categories/edit/${item._id}`}
                            className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all text-sm font-medium">
                            <Edit size={16} />
                            Edit
                          </Link>

                          <button onClick={() => handleDelete(item._id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-all text-sm font-medium">
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* GRID VIEW */}
        {viewType === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredCategories.map((item) => (
              <div key={item._id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all relative">
                <div className="flex items-start justify-between">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold"> {item.category[0]} </div>

                  <button onClick={() => toggleMenu(item._id)} className="p-2 hover:bg-gray-100 rounded-xl">
                    <MoreVertical size={18} />
                  </button>
                </div>

                {/* TITLE */}
                <div className="mt-5">
                  <h1 className="text-xl font-bold text-gray-900">
                    {item.category}
                  </h1>

                  <p className="text-gray-500 text-sm mt-1">
                    Category Management
                  </p>
                </div>

                {/* STATUS */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">

                  <p className="text-sm font-medium text-gray-600"> Status </p>
                  <label className="relative inline-flex items-center cursor-pointer">

                    <input type="checkbox" checked={item.isActive} className="sr-only peer"
                      onChange={() => toggleStatus(item._id, item.isActive)} />

                    <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500 transition-all"></div>
                    <div className=" absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-6"></div>
                  </label>
                </div>
                </div>

                {/* DATE */}
                <div className="mt-5 text-sm text-gray-500">
                  Created : {" "}
                  {new Date( item.createdAt ).toLocaleDateString()}
                </div>

                {/* MENU */}
                {openMenuId === item._id && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)}></div>
                    <div className="absolute right-5 top-20 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">

                      <Link to={`/category/edit/${item._id}`} className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-sm">
                        <Edit size={15} /> Edit
                      </Link>

                      <button onClick={() => handleDelete(item._id) }
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-red-600 text-sm border-t border-gray-100" >
                        <Trash2 size={15} />
                        Delete
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