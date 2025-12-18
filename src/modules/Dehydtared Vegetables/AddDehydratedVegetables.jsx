import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card";
import { ArrowLeft, CheckCircle } from "lucide-react";

const AddDehydratedVegetables = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const nameRef = useRef();
  const priceRef = useRef();
  const unitRef = useRef();
  const descRef = useRef();

  const addDehydratedVegetable = () => {
    const name = nameRef.current.value.trim();
    const price = priceRef.current.value;
    const unit = unitRef.current.value.trim();
    const description = descRef.current.value.trim();

    if (!name || !price || !unit) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("unit", unit);
    formData.append("cat_id", 3);
    formData.append("description", description);

    axios
      .post("http://localhost/ShreeHari/AddDehydratedVegetables.php", formData)
      .then(() => {
        setShowSuccess(true);
        setTimeout(() => navigate("/manage-DehydratedVegetables"), 1500);
      })
      .catch(() => alert("Error adding dehydrated vegetable"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3 shadow">
          <CheckCircle className="text-green-600" />
          <div>
            <p className="font-semibold">Dehydrated Fruit Added Successfully</p>
            <p className="text-sm">Redirecting...</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Link to="/manage-Herbs">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold">Add New Dehydrated Vegetable</h1>
      </div>

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

          <button
            onClick={addDehydratedVegetable}
            disabled={loading}
            className="btn-primary w-full py-3"
          >
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AddDehydratedVegetables;
