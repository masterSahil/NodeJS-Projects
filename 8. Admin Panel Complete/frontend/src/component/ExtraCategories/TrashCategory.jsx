import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar";
import {
  Search,
  Trash2,
  LayoutGrid,
  Table2,
  ArchiveRestore,
  Layers3,
} from "lucide-react";

export default function TrashExtraCategory() {
  const [extraCategories, setExtraCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("table");

  useEffect(() => {
    getTrashData();
  }, []);

  const getTrashData = async () => {
    try {
      const res = await axios.get("http://localhost:9000/trash-extra-category");

      setExtraCategories(res.data.extraCategories);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error", title: "Error",
        text: "Failed to Fetch extra category",
      });
    }
  };

  const restoreExtraCategory = async (id) => {
    const result = await Swal.fire({
      title: "Restore Extra Category?",
      text: "This item will become active again.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Restore",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.put(`http://localhost:9000/restore-extra-category/${id}`);

      setExtraCategories((prev) => prev.filter((item) => item._id !== id));

      Swal.fire({
        icon: "success",
        title: "Restored",
        text: "Extra Category restored successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error", title: "Error",
        text: "Failed to restore extra category",
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
      await axios.delete(`http://localhost:9000/permanent-extra-category/${id}`);

      setExtraCategories((prev) => prev.filter((item) => item._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Extra Category Permanently Deleted",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error", title: "Error",
        text: "Failed to Permanently Delete extra category",
      });
    }
  };

  const filteredExtraCategories = extraCategories.filter((item) => {
    const extra = item.extraCategory?.toLowerCase() || "";
    const sub = item.subCategoryId?.subcategory?.toLowerCase() || "";
    const cat = item.categoryId?.category?.toLowerCase() || "";

    return (
      extra.includes(searchTerm.toLowerCase()) ||
      sub.includes(searchTerm.toLowerCase()) ||
      cat.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6 lg:p-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Trash Extra Categories
          </h1>

          <p className="text-gray-500 mt-1">
            Restore or permanently delete extra categories
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row justify-between gap-4">

            <div className="relative w-full lg:max-w-sm">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search extra category..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-md outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewType("table")}
                className={`p-3 rounded-md ${
                  viewType === "table"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                <Table2 size={18} />
              </button>

              <button
                onClick={() => setViewType("grid")}
                className={`p-3 rounded-md ${
                  viewType === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>
        </div>

        {filteredExtraCategories.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <Trash2
              size={60}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-xl font-semibold mt-4">
              Trash Empty
            </h2>

            <p className="text-gray-500 mt-2">
              No deleted extra categories found
            </p>
          </div>
        )}

        {viewType === "table" &&
          filteredExtraCategories.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      Extra Category
                    </th>
                    <th className="px-6 py-4 text-left">
                      Sub Category
                    </th>
                    <th className="px-6 py-4 text-left">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left">
                      Deleted
                    </th>
                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredExtraCategories.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-5">
                        {item.extraCategory}
                      </td>

                      <td className="px-6 py-5">
                        {item.subCategoryId?.subcategory}
                      </td>

                      <td className="px-6 py-5">
                        {item.categoryId?.category}
                      </td>

                      <td className="px-6 py-5 text-green-600 font-semibold">
                        ₹ {item.pricing}
                      </td>

                      <td className="px-6 py-5 text-gray-500">
                        {new Date(
                          item.updatedAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-3">

                          <button
                            onClick={() =>
                              restoreExtraCategory(item._id)
                            }
                            className="px-4 py-2 bg-green-50 text-green-600 rounded-md"
                          >
                            Recover
                          </button>

                          <button
                            onClick={() =>
                              permanentDelete(item._id)
                            }
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-md"
                          >
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

        {viewType === "grid" &&
          filteredExtraCategories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {filteredExtraCategories.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Layers3 />
                  </div>

                  <h2 className="text-xl font-bold mt-5">
                    {item.extraCategory}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {item.subCategoryId?.subcategory}
                  </p>

                  <p className="text-gray-500">
                    {item.categoryId?.category}
                  </p>

                  <div className="mt-3 text-green-600 font-semibold">
                    ₹ {item.pricing}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() =>
                        restoreExtraCategory(item._id)
                      }
                      className="flex-1 bg-green-50 text-green-600 py-3 rounded-lg"
                    >
                      Recover
                    </button>

                    <button onClick={() => permanentDelete(item._id)}
                      className="flex-1 bg-red-50 text-red-600 py-3 rounded-lg">
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