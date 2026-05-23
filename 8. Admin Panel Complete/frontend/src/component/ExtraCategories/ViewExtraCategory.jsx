import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar";
import { Search, Plus, MoreVertical, LayoutGrid, Table2, Edit, Trash2, Layers3 } from "lucide-react";

export default function ViewExtraSubCategories() {
  const [extraCategories, setExtraCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("table");
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:9000/extra-category");

      setExtraCategories(res.data.extraCategories);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error", title: "Error",
        text: "Failed to fetch extra categories",
      });
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:9000/extra-category/${id}`, { isActive: !currentStatus });

      setExtraCategories((prev) => 
        prev.map((item) => item._id === id ? { ...item, isActive: !currentStatus, } : item));

      Swal.fire({
        icon: "success", title: "Updated", timer: 1500,
        text: `Extra Category ${!currentStatus ? "Activated" : "Deactivated"}`,
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
      title: "Delete Extra Category?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:9000/extra-category/${id}`);

      setExtraCategories((prev) =>prev.filter((item) => item._id !== id));

      Swal.fire({
        icon: "success", title: "Deleted", timer: 1500,
        text: "Extra Category deleted successfully",
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error", title: "Error",
        text: "Failed to delete extra category",
      });
    }
  };

  const filteredExtraCategories =
    extraCategories.filter((item) => {
      const extra = item.extraCategory?.toLowerCase() || "";
      const sub = item.subCategoryId?.subcategory?.toLowerCase() || "";
      const cat = item.categoryId?.category?.toLowerCase() || "";

      return (
        extra.includes(searchTerm.toLowerCase()) ||
        sub.includes(searchTerm.toLowerCase()) ||
        cat.includes(searchTerm.toLowerCase())
      );
    });

  const toggleMenu = (id) => {
    setOpenMenuId(
      openMenuId === id ? null : id
    );
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl font-bold"> Extra Categories </h1>
            <p className="text-gray-500 mt-1"> Manage all extra categories </p>
          </div>

          <Link to="/extra-categories/add"
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg">
            <Plus size={18} /> Add Extra Category
          </Link>
        </div>

        {/* SEARCH + VIEW */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="relative w-full lg:max-w-sm">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

              <input type="text" placeholder="Search extra category..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-black"/>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setViewType("table")} className={`p-3 rounded-md ${
                  viewType === "table" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                <Table2 size={18} />
              </button>

              <button onClick={() => setViewType("grid")}
                className={`p-3 rounded-md ${
                  viewType === "grid" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600" }`}>
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
                    <th className="px-6 py-4"> Extra Category </th>
                    <th className="px-6 py-4"> Sub Category </th>
                    <th className="px-6 py-4"> Category </th>
                    <th className="px-6 py-4"> Price </th>
                    <th className="px-6 py-4"> Status </th>
                    <th className="px-6 py-4"> Created </th>
                    <th className="px-6 py-4 text-right"> Actions </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredExtraCategories.map(
                    (item) => (
                      <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                              <Layers3 />
                            </div>

                            <div>
                              <h1 className="font-semibold"> { item.extraCategory } </h1>
                              <p className="text-sm text-gray-500"> Extra Category </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5"> { item.subCategoryId?.subcategory} </td>

                        <td className="px-6 py-5"> { item.categoryId?.category} </td>

                        <td className="px-6 py-5 font-semibold text-green-600">
                          ₹ {item.pricing}
                        </td>

                        <td className="px-6 py-5">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={item.isActive } className="sr-only peer"
                              onChange={() => toggleStatus( item._id, item.isActive )}/>

                            <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500"></div>
                            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-6"></div>
                          </label>
                        </td>

                        <td className="px-6 py-5 text-gray-600">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-3">
                            <Link to={`/extra-categories/edit/${item._id}`}
                              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md">
                              <Edit size={16} />
                              Edit
                            </Link>

                            <button onClick={() => handleDelete(item._id)}
                              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-md">
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}

                  {filteredExtraCategories.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-gray-500">
                        No Extra Categories Found
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
            {filteredExtraCategories.map(
              (item) => (
                <div key={item._id}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md relative">
                  <div className="flex justify-between">
                    <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <Layers3 size={28} />
                    </div>

                    <button onClick={() => toggleMenu( item._id )}> <MoreVertical /> </button>
                  </div>

                  <h2 className="text-xl font-bold mt-5"> { item.extraCategory } </h2>
                  <p className="text-gray-500 mt-1"> { item.subCategoryId?.subcategory} </p>
                  <p className="text-gray-500 mt-1"> { item.categoryId?.category } </p>

                  <div className="mt-4 inline-flex px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-semibold">
                    ₹ {item.pricing}
                  </div>

                  <div className="mt-5 flex justify-between items-center">
                    <span className="text-sm text-gray-500"> Status </span>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={ item.isActive } className="sr-only peer"
                        onChange={() => toggleStatus(item._id, item.isActive)} />

                      <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-6"></div>
                    </label>
                  </div>

                  <p className="mt-5 text-sm text-gray-500">
                    Created :{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>

                  {openMenuId ===
                    item._id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId( null )}/>
                      <div className="absolute top-20 right-5 w-40 bg-white border rounded-lg shadow-lg z-20">
                        <Link to={`/extra-categories/edit/${item._id}`} className="flex items-center gap-2 px-4 py-3">
                          <Edit size={15}/> Edit
                        </Link>

                        <button onClick={() => handleDelete(item._id)}
                          className="w-full flex items-center gap-2 px-4 py-3 text-red-600 border-t">
                          <Trash2 size={15} /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
}