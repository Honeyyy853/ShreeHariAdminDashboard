import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card";
import { ArrowLeft, CheckCircle, Upload, X } from "lucide-react";

const AddHerbs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const nameRef = useRef();
  const priceRef = useRef();
  const unitRef = useRef();
  const descRef = useRef();
  const imgRef = useRef();

  const addHerb = () => {
    const name = nameRef.current.value.trim();
    const price = priceRef.current.value;
    const unit = unitRef.current.value.trim();
    const description = descRef.current.value.trim();
    const imgData = imgRef.current.files[0];

    if (!name || !price || !unit) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("unit", unit);
    formData.append("cat_id", 1);
    formData.append("description", description);
    formData.append("HerbImg", imgData);

    axios
      .post("http://localhost/ShreeHari/AddHerbs.php", formData)
      .then(() => {
        setShowSuccess(true);
        setTimeout(() => navigate("/manage-Herbs"), 1500);
      })
      .catch(() => alert("Error adding herb"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3 shadow">
          <CheckCircle className="text-green-600" />
          <div>
            <p className="font-semibold">Herb Added Successfully</p>
            <p className="text-sm">Connecting...</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Link to="/manage-Herbs">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold">Add New Herb</h1>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="md:col-span-2">
          <Card hover={false}>
            <div className="space-y-4">
              <input
                ref={nameRef}
                className="input-field"
                placeholder="Product Name *"
              />

              <input
                ref={priceRef}
                type="number"
                className="input-field"
                placeholder="Price *"
              />

              <input
                ref={unitRef}
                className="input-field"
                placeholder="Unit (100g, 50g) *"
              />

              <textarea
                ref={descRef}
                rows="4"
                className="input-field"
                placeholder="Description"
              />
            </div>
          </Card>
        </div>

        {/* RIGHT – IMAGE UPLOAD */}
        <div>
          <Card hover={false}>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  className="w-full h-64 object-cover rounded"
                />
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
                <input ref={imgRef} type="file" hidden accept="image/*" />
              </label>
            )}
          </Card>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={addHerb}
        disabled={loading}
        className="btn-primary w-full py-3"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </div>
  );
};

export default AddHerbs;
