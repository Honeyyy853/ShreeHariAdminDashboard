import React, { useState, useEffect } from "react";
import {
  Eye,
  Edit,
  Trash2,
  X,
  Search,
  CreditCard,
  IndianRupee,
} from "lucide-react";
import axios from "axios";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch payments from API
  useEffect(() => {
    axios
      .get("http://localhost/ShreeHari/payments.php") // Replace with your actual API endpoint
      .then((response) => {
        if (response.status === 200) {
          const apiOutput = response.data;
          // Assuming your API returns an array of payments in `data`
          setPayments(apiOutput.data || []);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedPayment(null);
  };

  // Filter payments based on search term and status
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.order_id
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.payment_method.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      payment.payment_status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Payments
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Payment history and revenue tracking
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search payments..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <IndianRupee className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
              ₹
                {payments
                  .filter((p) => p.payment_status === "Completed")
                  .reduce((sum, payment) => sum + parseFloat(payment.amount), 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Payments
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {payments.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Pending Payments
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {payments.filter((p) => p.payment_status === "Pending").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr
                  key={payment.payment_id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.transaction_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.order_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ₹{parseFloat(payment.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.payment_method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(payment.payment_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.payment_status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : payment.payment_status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : payment.payment_status === "Failed"
                          ? "bg-red-100 text-red-800"
                          : payment.payment_status === "Refunded"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {payment.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                    <button
                      // onClick={() => handleViewPayment(payment)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                      title="View Payment"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                      title="Edit Payment"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                      title="Delete Payment"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No payments found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Payment Modal (same as before) */}
      {isViewModalOpen && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Payment Details
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Transaction: {selectedPayment.transaction_id}
                </p>
              </div>
              <button
                onClick={closeViewModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Transaction Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Transaction ID</p>
                      <p className="font-medium">
                        {selectedPayment.transaction_id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-medium">{selectedPayment.order_id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="font-medium text-lg text-green-600">
                        ${parseFloat(selectedPayment.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Payment Status
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedPayment.payment_status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : selectedPayment.payment_status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : selectedPayment.payment_status === "Failed"
                            ? "bg-red-100 text-red-800"
                            : selectedPayment.payment_status === "Refunded"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedPayment.payment_status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-medium">
                        {selectedPayment.payment_method}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Date</p>
                      <p className="font-medium">
                        {new Date(
                          selectedPayment.payment_date
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Customer Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">
                        {selectedPayment.customer_name || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={closeViewModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
