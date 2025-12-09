import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '../../components/Card';
import { ArrowLeft, Upload, X, CheckCircle } from 'lucide-react';

/**
 * Edit Category Page
 * Form to edit an existing category
 */

// Validation schema (same as AddCategory)
const categorySchema = z.object({
  name: z.string().min(3, 'Category name must be at least 3 characters'),
  description: z.string().optional(),
});

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  // Load category data
  useEffect(() => {
    // Simulate API call to fetch category
    const dummyCategory = {
      id: parseInt(id) || 1,
      name: 'Organic Seeds',
      description: 'Premium quality organic seeds for farming',
      image: '/api/placeholder/150/150',
    };
    setCategory(dummyCategory);
    setImagePreview(dummyCategory.image);
    reset(dummyCategory);
  }, [id, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Updated category data:', data);
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/categories');
      }, 1500);
    }, 1000);
  };

  if (!category) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Loading category data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 animate-fadeIn">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 animate-slideDown">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 shadow-lg">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-900">Category Updated Successfully!</p>
              <p className="text-sm text-green-700">Redirecting to categories list...</p>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Link 
          to="/categories" 
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200 flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Category</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Update category information below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card hover={false}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className="input-field"
                    placeholder="Enter category name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    {...register('description')}
                    rows="4"
                    className="input-field"
                    placeholder="Enter category description"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image Upload */}
            <Card hover={false}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Category Image</h2>
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                    <label className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full hover:bg-primary-dark cursor-pointer transition-all duration-200 shadow-lg">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-primary transition-all duration-200 group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 mb-3 text-gray-400 group-hover:text-primary transition-colors" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </Card>

            {/* Actions */}
            <Card hover={false}>
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Updating Category...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Update Category</span>
                    </>
                  )}
                </button>
                <Link
                  to="/categories"
                  className="block w-full text-center btn-secondary py-3 transition-all duration-200"
                >
                  Cancel
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;