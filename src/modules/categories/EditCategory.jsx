import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Card from "../../components/Card";
import { ArrowLeft, CheckCircle } from "lucide-react";

const categorySchema = z.object({
  name: z.string().min(3, "Category name must be at least 3 characters"),
  description: z.string().optional(),
});

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 shadow-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-900">
                Category Updated Successfully!
              </p>
              <p className="text-sm text-green-700">Redirecting...</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Link to="/categories" className="p-2 rounded-lg hover:bg-gray-100">
          <ArrowLeft className="w-6 h-6" />
        </Link>

        <div>
          <h1 className="text-3xl font-bold">Edit Category</h1>
          <p className="text-gray-600">Update category details</p>
        </div>
      </div>

      <form>
        <div className="max-w-3xl">
          <Card hover={false}>
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows="4"
                  className="input-field"
                  placeholder="Enter category description"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-6 py-2"
                >
                  {loading ? "Updating..." : "Update Category"}
                </button>

                <Link to="/categories" className="btn-secondary px-6 py-2">
                  Cancel
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
