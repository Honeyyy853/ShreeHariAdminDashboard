import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card";
import { ArrowLeft, Upload, X, CheckCircle } from "lucide-react";

const AddDehydratedFruits = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const nameRef = useRef();
  const priceRef = useRef();
  const unitRef = useRef();
  const descRef = useRef();
  const catRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const addDehydratedFruit = () => {
    const productName = nameRef.current.value.trim();
    const productPrice = priceRef.current.value;
    const productUnit = unitRef.current.value.trim();
    const productDesc = descRef.current.value.trim();
    const cat_id = catRef.current.value;

    if (!productName || !productPrice || !productUnit || !cat_id) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productUnit", productUnit);
    formData.append("productDesc", productDesc);
    formData.append("cat_id", cat_id);

   
    if (imageFile) {
      formData.append("image", imageFile);
    }

    axios
      .post("http://localhost/ShreeHari/AddDehydtaredFruits.php", formData)
      .then(() => {
        setShowSuccess(true);
        setTimeout(() => navigate("/manage-DehydratedFruits"), 1500);
      })
      .catch(() => alert("Error adding product"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3 shadow">
            <CheckCircle className="text-green-600" />
            <div>
              <p className="font-semibold">Product Added Successfully</p>
              <p className="text-sm">Redirecting...</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Link to="/manage-DehydratedFruits">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold">Add New Dehydrated Fruit product</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <Card hover={false}>
            <div className="space-y-4">
              <input ref={nameRef} className="input-field" placeholder="Product Name *" />
              <input ref={priceRef} type="number" className="input-field" placeholder="Price *" />
              <input ref={unitRef} className="input-field" placeholder="Unit (100g, 50g) *" />

              <select ref={catRef} className="input-field">
                <option value="">Select Category *</option>
                <option value="1">Herbs</option>
                <option value="2">Dehydtared Fruits</option>
                <option value="3">Dehydtared Vegetables</option>
              </select>

              <textarea ref={descRef} rows="4" className="input-field" placeholder="Description" />
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <Card hover={false}>
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} className="w-full h-64 object-cover rounded" />
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setImageFile(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-64 border-dashed border rounded cursor-pointer">
                <Upload className="mb-2 text-gray-400" />
                <p className="text-sm">Upload Image (optional)</p>
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </Card>

          <Card hover={false}>
            <button onClick={addDehydratedFruit} disabled={loading} className="btn-primary w-full py-3">
              {loading ? "Saving..." : "Save Product"}
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddDehydratedFruits;
