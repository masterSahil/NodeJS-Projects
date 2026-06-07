import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar";
import { Search, Trash2, LayoutGrid, Table2, Package, ArchiveRestore } from "lucide-react";

export default function TrashProduct() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("table");

  useEffect(() => {
    getTrashData();
  }, []);

  const getTrashData = async () => {
    try {
      const res = await axios.get("http://localhost:9000/products-trashed");
      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error", 
        title: "Error",
        text: "Failed to fetch deleted products",
      });
    }
  };

  const restoreProduct = async (id) => {
    const result = await Swal.fire({
      title: "Restore Product?",
      text: "This item will become active again.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Restore",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.put(`http://localhost:9000/products/restore/${id}`);

      setProducts((prev) => prev.filter((item) => item._id !== id));
      Swal.fire({
        icon: "success",
        title: "Restored",
        text: "Product restored successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error", 
        title: "Error",
        text: "Failed to restore product",
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
      await axios.delete(`http://localhost:9000/products/permanent/${id}`);

      setProducts((prev) => prev.filter((item) => item._id !== id));
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Product permanently deleted",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error", 
        title: "Error",
        text: "Failed to permanently delete product",
      });
    }
  };

  const filteredProducts = products.filter((item) => {
    const prodName = (item.productName?.extraCategory || item.productName || "").toLowerCase();
    const cat = (item.productCategory?.category || "").toLowerCase();
    const subCat = (item.productSubCategory?.subcategory || "").toLowerCase();
    const term = searchTerm.toLowerCase();

    return (
      prodName.includes(term) ||
      cat.includes(term) ||
      subCat.includes(term)
    );
  });

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6 lg:p-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Trash Products
          </h1>

          <p className="text-gray-500 mt-1">
            Restore or permanently delete products
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
                placeholder="Search product..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-md outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button onClick={() => setViewType("table")}
                className={`p-3 rounded-md 
                  ${ viewType === "table" ? "bg-blue-600 text-white" : "bg-gray-100" }`} >
                <Table2 size={18} />
              </button>

              <button onClick={() => setViewType("grid")} className={`p-3 rounded-md ${ viewType === "grid" ? "bg-blue-600 text-white" : "bg-gray-100" }`}>
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <Trash2 size={60} className="mx-auto text-gray-300" />

            <h2 className="text-xl font-semibold mt-4">Trash Empty</h2>
            <p className="text-gray-500 mt-2"> No deleted products found </p>
          </div>
        )}

        {viewType === "table" &&
          filteredProducts.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium text-gray-500">
                      Product Name
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-gray-500">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-gray-500">
                      Sub Category
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-gray-500">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-gray-500">
                      Deleted
                    </th>
                    <th className="px-6 py-4 text-right font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((item) => (
                    <tr key={item._id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex shrink-0 items-center justify-center border border-gray-200 overflow-hidden">
                            {item.image ? (
                              <img 
                                src={`http://localhost:9000/uploads/${item.image}`} 
                                alt="product" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package className="text-gray-400" size={18} />
                            )}
                          </div>
                          <span className="font-medium text-gray-900">
                            {item.productName?.extraCategory || "N/A"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {item.productCategory?.category || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {item.productSubCategory?.subcategory || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-green-600 font-semibold">
                        ₹ {item.price || item.pricing}
                      </td>

                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {new Date( item.updatedAt || item.createdAt ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-3">
                          <button onClick={() =>restoreProduct(item._id)} className="px-4 py-2 bg-green-50 text-green-600 rounded-md flex items-center gap-2 hover:bg-green-100 transition-colors text-sm font-medium">
                            <ArchiveRestore size={16} /> Recover
                          </button>

                          <button onClick={() =>permanentDelete(item._id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-md flex items-center gap-2 hover:bg-red-100 transition-colors text-sm font-medium">
                            <Trash2 size={16} /> Delete Forever
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        {viewType === "grid" && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((item) => (
              <div key={item._id}
                className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col h-full">

                <div className="flex justify-between items-start mb-4">
                  {/* Image or Icon Fallback */}
                  <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex shrink-0 items-center justify-center overflow-hidden border border-blue-100 group-hover:border-blue-300 transition-colors duration-300">
                    {item.image ? (
                      <img 
                        src={`http://localhost:9000/uploads/${item.image}`} 
                        alt="product" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package size={24} />
                    )}
                  </div>
                  <div className="text-lg font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                    ₹ {item.price || item.pricing}
                  </div>
                </div>

                {/* Content: Title & Categories */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-1 mb-3">
                    {item.productName?.extraCategory || "N/A"}
                  </h2>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.productCategory?.category && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {item.productCategory.category}
                      </span>
                    )}
                    {item.productSubCategory?.subcategory && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                        {item.productSubCategory.subcategory}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions: Buttons */}
                <div className="mt-6 flex gap-3 pt-5 border-t border-gray-100">
                  <button onClick={() => restoreProduct(item._id)} className="flex-1 bg-green-50 text-green-600 font-medium py-2.5 text-sm rounded-xl flex justify-center items-center gap-2 hover:bg-green-100 transition-colors duration-300"> 
                    <ArchiveRestore size={18} /> Recover
                  </button>
                  <button onClick={() => permanentDelete(item._id)} className="flex-1 bg-red-50 text-red-600 font-medium py-2.5 text-sm rounded-xl flex justify-center items-center gap-2 hover:bg-red-100 transition-colors duration-300">
                    <Trash2 size={18} /> Delete 
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