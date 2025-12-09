import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '../../components/Card';
import { ArrowLeft, Upload, X, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Validation schema
const categorySchema = z.object({
  name: z.string().min(3, 'Category name must be at least 3 characters'),
  description: z.string().optional(),
});

const AddCategory = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("FINAL CATEGORY DATA:", data);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => navigate('/categories'), 1500);
    }, 1000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 animate-slideDown">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 shadow-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-900">Category Added Successfully!</p>
              <p className="text-sm text-green-700">Redirecting to categories list...</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          to="/categories" 
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Category</h1>
          <p className="text-gray-600 mt-1">Fill in the category details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT SIDE FORM */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* BASIC INFO */}
            <Card hover={false}>
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                
                {/* NAME */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
                  <input
                    type="text"
                    {...register('name')}
                    className="input-field"
                    placeholder="Enter category name"
                  />
                  {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
                </div>
                
                {/* DESCRIPTION */}
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
          
          {/* RIGHT SIDE IMAGE & ACTIONS */}
          <div className="space-y-6">
            
            {/* IMAGE UPLOAD */}
            <Card hover={false}>
              <h2 className="text-xl font-semibold mb-4">Category Image</h2>
              
              {imagePreview ? (
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg shadow"
                  />
                  
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow transition-all hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  <label className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full shadow cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <Upload className="w-12 h-12 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Click to upload or drag & drop</p>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </Card>
            
            {/* ACTION BUTTONS */}
            <Card hover={false}>
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Save Category
                    </>
                  )}
                </button>
                
                <Link to="/categories" className="block w-full text-center btn-secondary py-3">
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

export default AddCategory;