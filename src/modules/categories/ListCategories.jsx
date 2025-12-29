import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ListCategories = () => {
  const [DataCat, setDataCat] = useState([]);
  const [deleteCategory, setDeleteCategory] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setDeleteCategory(id);
    setShow(true);
  };

  useEffect(() => {
    axios.get("http://localhost/ShreeHari/category.php").then((response) => {
      if (response.status === 200) {
        var apiOutput = response.data;
        var testData = apiOutput.data;
        setDataCat(apiOutput.data);
      }
    });
  });

  function handleDelete(id) {
    const formData = new FormData();
    formData.append("id", deleteCategory);
    axios
      .post("http://localhost/ShreeHari/deleteCategory.php", formData)
      .then((response) => {
        var json = response.data;
        if (json.status == "true") {
          var message = json.message;
          alert(message);
          setShow(false);
          setDataCat(DataCat.filter((item) => item.id !== deleteCategory));
        } else {
          var message = json.message;
          alert(message);
        }
      })
      .catch(() => alert("Error delete category"));
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Manage Category
        </h1>

        {/* <Link
          to="/add-category"
          className="text-white bg-primary px-4 py-2 rounded-lg"
        >
          + Add Category
        </Link> */}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {DataCat.map((item) => (
              <tr className="hover:bg-gray-50 transition">
                {/* Name */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm font-medium">
                  {item.name}
                </td>

                {/* Description */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                  {item.Description}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right flex items-center justify-end gap-2">
                  {/* View Button */}
                  <button
                    onClick={() => handleView(item)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <Eye className="w-4 h-4 text-gray-3600" />
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
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={(e) => handleShow(item.id)}
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={(e) => handleDelete()}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListCategories;
