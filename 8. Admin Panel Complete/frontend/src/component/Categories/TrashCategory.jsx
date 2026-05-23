import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar";
import { Search, RotateCcw, Trash2, LayoutGrid, Table2, ArchiveRestore } from "lucide-react";

export default function TrashCategory() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("table");

  const getTrashData = async () => {
    try {
      const res = await axios.get("http://localhost:9000/trash-category");
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Fetch Category Data",
      });
    }
  };

  const restoreCategory = async (id) => {
    const result = await Swal.fire({
      title: "Restore Category?",
      text: "This category will become active again.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Restore",
    });
    if (!result.isConfirmed) return;

    try {
      await axios.put(`http://localhost:9000/restore-category/${id}`);

      setCategories((prev) => prev.filter((item) => item._id !== id));
      Swal.fire({
        icon: "success",
        title: "Restored",
        text: "Category restored successfully",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to restored Category",
      });
    }
  };

  const permanentDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Permanently?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete Forever",
    });
    if (!result.isConfirmed) return;
    try {
      await axios.delete(`http://localhost:9000/permanent-category/${id}`);

      setCategories((prev) => prev.filter((item) => item._id !== id));
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Category Permanently Deleted",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Permanent Delete Category",
      });      
    }
  };

  const filteredCategories = categories.filter((item) =>
    item.category.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    getTrashData();
  }, []);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Trash Categories
            </h1>

            <p className="text-gray-500 mt-1">
              Restore or permanently delete categories
            </p>
          </div>
        </div>

        {/* SEARCH + VIEW */}
        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row justify-between gap-4">

            <div className="relative w-full lg:max-w-sm">
              <Search size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

              <input
                type="text"
                placeholder="Search category..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button onClick={() => setViewType("table")}
                className={`p-3 rounded-md ${ viewType === "table" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                <Table2 size={20} />
              </button>

              <button onClick={() => setViewType("grid")}
                className={`p-3 rounded-md ${
                  viewType === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}>
                <LayoutGrid size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* EMPTY */}
        {filteredCategories.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <Trash2 size={55} className="mx-auto text-gray-300" />

            <h2 className="text-xl font-semibold mt-4">
              Trash Empty
            </h2>

            <p className="text-gray-500 mt-2">
              No deleted categories found
            </p>
          </div>
        )}

        {/* TABLE */}
        {viewType === "table" &&
          filteredCategories.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left">
                      Deleted Date
                    </th>

                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCategories.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full capitalize bg-blue-500 text-white flex items-center justify-center font-bold">
                            {item.category[0]}
                          </div>

                          <h2 className="font-semibold">
                            {item.category}
                          </h2>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-gray-500">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-3">
                          <button onClick={() => restoreCategory(item._id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100">
                            <ArchiveRestore size={16} />
                            Recover
                          </button>

                          <button onClick={() => permanentDelete(item._id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100">
                            <Trash2 size={16} />
                            Delete Forever
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        {/* GRID */}
        {viewType === "grid" &&
          filteredCategories.length > 0 && (
            <div className="grid grid-cols-1 capitalize md:grid-cols-2 xl:grid-cols-3 gap-6">

              {filteredCategories.map((item) => (
                <div key={item._id}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
                    {item.category[0]}
                  </div>

                  <h2 className="mt-5 text-xl font-bold">
                    {item.category}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Deleted Category
                  </p>

                  <div className="mt-6 flex gap-3">
                    <button onClick={() => restoreCategory(item._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-100 text-green-700 py-3 rounded-lg">
                      <ArchiveRestore size={16} />
                      Recover
                    </button>

                    <button onClick={() => permanentDelete(item._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-lg">
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </main>
    </div>
  );
}