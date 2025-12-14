import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Search } from "lucide-react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Orders
  useEffect(() => {
    axios
      .get("http://localhost/ShreeHari/orders.php")
      .then((res) => {
        if (res.data.status) setOrders(res.data.data);
        else setOrders([]);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter by search
  const filteredOrders = orders.filter((order) =>
    (order.order_id + " " + order.user_id + " " + order.order_status)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage and track customer orders</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search orders..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <Th>Order ID</Th>

              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Payment Status</Th>
              <Th>Amount</Th>
              <Th>Shipping Address</Th>
              <Th>Billing Address</Th>
              <Th>Ship Method</Th>
              <Th>Pay Method</Th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((o) => (
                <tr key={o.order_id} className="hover:bg-gray-50 transition">
                  <Td>{o.order_id}</Td>

                  <Td>{o.order_date}</Td>
                  <Td>
                    <StatusBadge status={o.order_status} />
                  </Td>
                  <Td>
                    <PaymentBadge status={o.payment_status} />
                  </Td>
                  <Td>₹{parseFloat(o.total_amount).toFixed(2)}</Td>
                  <Td>{o.shipping_address}</Td>
                  <Td>{o.billing_address}</Td>
                  <Td>{o.shipping_method}</Td>
                  <Td>{o.payment_method}</Td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex justify-end gap-2">
                    <IconBtn>
                      <Eye className="w-4 h-4 text-gray-600" />
                    </IconBtn>
                    <IconBtn color="blue">
                      <Edit className="w-4 h-4 text-blue-600" />
                    </IconBtn>
                    <IconBtn color="red">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </IconBtn>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* Components */
const Th = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
    {children}
  </td>
);

const IconBtn = ({ children, color }) => {
  const colors =
    color === "red"
      ? "bg-red-100 hover:bg-red-200"
      : color === "blue"
      ? "bg-blue-100 hover:bg-blue-200"
      : "bg-gray-100 hover:bg-gray-200";

  return (
    <button className={`p-2 rounded-lg transition ${colors}`}>
      {children}
    </button>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    pending: "bg-yellow-100 text-yellow-700",
    shipped: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    default: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${
        map[status?.toLowerCase()] || map.default
      }`}
    >
      {status}
    </span>
  );
};

const PaymentBadge = ({ status }) => {
  const map = {
    paid: "bg-green-100 text-green-700",
    cod: "bg-yellow-100 text-yellow-700",
    upi: "bg-blue-100 text-blue-700",
    default: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${
        map[status?.toLowerCase()] || map.default
      }`}
    >
      {status}
    </span>
  );
};

export default Orders;
