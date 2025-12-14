import React, { useState, useEffect } from "react";
import { Edit, Trash2, Eye, Search } from "lucide-react";
import axios from "axios";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch feedback from API
  useEffect(() => {
    axios
      .get("http://localhost/ShreeHari/feedback.php")
      .then((response) => {
        if (response.status === 200) {
          // Ensure it's always an array
          setFeedbacks(
            Array.isArray(response.data.data) ? response.data.data : []
          );
        }
      })
      .catch((err) => console.error("API Error:", err))
      .finally(() => setLoading(false));
  }, []);

  // Filter feedback safely
  const filteredFeedbacks = feedbacks.filter((f) => {
    const userName = f.user_name?.toLowerCase() || "";
    const productName = f.product_name?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return userName.includes(search) || productName.includes(search);
  });

  if (loading) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Loading feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Feedback
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage all user feedback
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search feedback..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Feedback table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                User Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Comment
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFeedbacks.length > 0 ? (
              filteredFeedbacks.map((fb) => (
                <tr
                  key={fb.feedback_id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {fb.feedback_id ?? "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {fb.user_name ?? "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {fb.product_name ?? "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {fb.rating ?? "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {fb.comment ?? "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {fb.created_at
                      ? new Date(fb.created_at).toLocaleString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end gap-2">
                    <button
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                      title="View Feedback"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                      title="Edit Feedback"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                      title="Delete Feedback"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No feedback found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedback;
