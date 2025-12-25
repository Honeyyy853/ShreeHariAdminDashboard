import axios from "axios";
import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";

const ListProducts = () => {
  const [DataCat, setDataCat] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch API
  useEffect(() => {
    axios
      .get("http://localhost/ShreeHari/ListDehydratedVegetables.php")
      .then((response) => {
        if (response.status === 200) {
          const apiOutput = response.data;
          setDataCat(apiOutput.data || []);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // View Handler
  const handleView = (item) => {
    setSelectedProduct(item);
    setShowModal(true);
  };

  // Delete Handler (Dummy)
  const handleDelete = (id) => {
    alert("You clicked delete for: " + id);
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Manage Dehydrated Vegetables
        </h1>

        {/* <Link
          to="/add-product"
          className="text-white bg-primary px-4 py-2 rounded-lg"
        >
          + Add Product
        </Link> */}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {/* New ID column */}
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                ID
              </th>

              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                Unit
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {DataCat.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                {/* ID */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                  {++idx}
                </td>

                {/* Image */}
                <td className="px-6 py-4 whitespace-nowrap">
                <img
                    src={(`assets/uploads/DehydratedVegetables/${item.image}`) || "https://via.placeholder.com/60"}
                    alt={item.name}
                    className="h-14 w-14 rounded object-cover border"
                  />
                </td>

                {/* Name */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                  {item.name}
                </td>

                {/* Description */}
                <td className="px-6 py-4 text-gray-600 text-sm max-w-xs break-words">
                  {item.description}
                </td>

                {/* Price */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                  ₹ {item.price}
                </td>

                {/* Unit */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                  {item.unit}
                </td>

                {/* Category */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                  {item.category_name || "-"}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right flex items-center justify-end gap-2">
                  {/* View Button */}
                  <button
                    // onClick={() => handleView(item)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>

                  {/* Edit Page */}
                  <Link
                    // to={`/edit-product/${item.id}`}
                    className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </Link>

                  {/* Delete Button */}
                  <button
                    // onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {DataCat.length === 0 && (
          <div className="p-6 text-center text-gray-500 text-sm">
            No products found.
          </div>
        )}
      </div>

      {/* Modal View */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <img
              src={selectedProduct.image || "https://via.placeholder.com/300"}
              className="w-full h-44 object-cover rounded mb-4"
              alt={selectedProduct.name}
            />

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {selectedProduct.name}
            </h2>

            <p className="text-gray-600 text-sm mb-3">
              {selectedProduct.description}
            </p>

            <p className="text-gray-800 text-sm font-medium mb-2">
              Price: ₹ {selectedProduct.price}
            </p>

            <p className="text-gray-800 text-sm font-medium mb-2">
              Unit: {selectedProduct.unit}
            </p>

            <p className="text-gray-500 text-sm mb-4">
              Category: {selectedProduct.category_name || "-"}
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-primary text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProducts;
