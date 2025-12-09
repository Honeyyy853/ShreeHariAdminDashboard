import axios from 'axios';

// Base API URL - Update this to your PHP backend URL
const API_BASE_URL = 'http://localhost/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Dummy data generators for development
export const dummyData = {
  // Dashboard metrics
  getDashboardMetrics: () => ({
    totalProducts: 156,
    totalCategories: 12,
    totalOrders: 1248,
    totalRevenue: 2450000,
    todayOrders: 23,
    pendingOrders: 18,
    totalUsers: 892,
    bulkInquiries: 7,
  }),

  // Monthly sales data for area chart
  getMonthlySales: () => [
    { month: 'Jan', sales: 120000 },
    { month: 'Feb', sales: 150000 },
    { month: 'Mar', sales: 180000 },
    { month: 'Apr', sales: 200000 },
    { month: 'May', sales: 220000 },
    { month: 'Jun', sales: 250000 },
    { month: 'Jul', sales: 280000 },
    { month: 'Aug', sales: 300000 },
    { month: 'Sep', sales: 320000 },
    { month: 'Oct', sales: 350000 },
    { month: 'Nov', sales: 380000 },
    { month: 'Dec', sales: 400000 },
  ],

  // Order trends for line chart
  getOrderTrends: () => [
    { week: 'Week 1', orders: 45 },
    { week: 'Week 2', orders: 52 },
    { week: 'Week 3', orders: 48 },
    { week: 'Week 4', orders: 61 },
    { week: 'Week 5', orders: 55 },
    { week: 'Week 6', orders: 68 },
  ],

  // Category sales for pie chart - Using brand colors
  getCategorySales: () => [
    { name: 'Seeds', value: 35, color: '#116530' }, // Deep Green - primary brand color
    { name: 'Fertilizers', value: 25, color: '#D4A017' }, // Mustard Yellow - accent brand color
    { name: 'Tools', value: 20, color: '#1a7a3d' }, // Primary light green variant
    { name: 'Equipment', value: 15, color: '#b88714' }, // Accent dark mustard variant
    { name: 'Others', value: 5, color: '#6b7280' }, // Brand grey
  ],

  // Recent orders
  getRecentOrders: () => [
    {
      id: 'ORD-001',
      customer: 'Rajesh Kumar',
      amount: 2500,
      status: 'Delivered',
      date: '2024-01-15',
    },
    {
      id: 'ORD-002',
      customer: 'Priya Sharma',
      amount: 1800,
      status: 'Shipped',
      date: '2024-01-14',
    },
    {
      id: 'ORD-003',
      customer: 'Amit Patel',
      amount: 3200,
      status: 'Packed',
      date: '2024-01-14',
    },
    {
      id: 'ORD-004',
      customer: 'Sneha Reddy',
      amount: 1500,
      status: 'Pending',
      date: '2024-01-13',
    },
    {
      id: 'ORD-005',
      customer: 'Vikram Singh',
      amount: 4200,
      status: 'Delivered',
      date: '2024-01-13',
    },
    {
      id: 'ORD-006',
      customer: 'Anjali Mehta',
      amount: 2100,
      status: 'Shipped',
      date: '2024-01-12',
    },
    {
      id: 'ORD-007',
      customer: 'Rahul Verma',
      amount: 2800,
      status: 'Packed',
      date: '2024-01-12',
    },
    {
      id: 'ORD-008',
      customer: 'Kavita Nair',
      amount: 1900,
      status: 'Pending',
      date: '2024-01-11',
    },
    {
      id: 'ORD-009',
      customer: 'Suresh Iyer',
      amount: 3500,
      status: 'Delivered',
      date: '2024-01-11',
    },
    {
      id: 'ORD-010',
      customer: 'Meera Joshi',
      amount: 2200,
      status: 'Shipped',
      date: '2024-01-10',
    },
  ],

  // Latest inquiries
  getLatestInquiries: () => [
    {
      id: 1,
      name: 'Ramesh Kumar',
      email: 'ramesh@example.com',
      phone: '9876543210',
      message: 'Interested in bulk order of organic seeds',
      status: 'Pending',
      date: '2024-01-15',
    },
    {
      id: 2,
      name: 'Sunita Devi',
      email: 'sunita@example.com',
      phone: '9876543211',
      message: 'Need information about fertilizer products',
      status: 'Completed',
      date: '2024-01-14',
    },
    {
      id: 3,
      name: 'Mohan Das',
      email: 'mohan@example.com',
      phone: '9876543212',
      message: 'Bulk inquiry for farming equipment',
      status: 'Pending',
      date: '2024-01-13',
    },
  ],

  // Low stock products
  getLowStockProducts: () => [
    { id: 1, name: 'Organic Wheat Seeds', stock: 5, threshold: 20 },
    { id: 2, name: 'NPK Fertilizer 50kg', stock: 8, threshold: 25 },
    { id: 3, name: 'Garden Trowel', stock: 12, threshold: 30 },
    { id: 4, name: 'Watering Can', stock: 3, threshold: 15 },
  ],
};

// API functions (replace with actual API calls)
export const apiService = {
  // Auth
  login: (credentials) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = 'dummy_jwt_token_' + Date.now();
        localStorage.setItem('admin_token', token);
        resolve({ data: { token, user: { name: 'Admin User', email: credentials.email } } });
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem('admin_token');
  },

  // Products
  getProducts: (page = 1, search = '') => {
    return api.get('/products', { params: { page, search } });
  },

  getProduct: (id) => {
    return api.get(`/products/${id}`);
  },

  createProduct: (data) => {
    return api.post('/products', data);
  },

  updateProduct: (id, data) => {
    return api.put(`/products/${id}`, data);
  },

  deleteProduct: (id) => {
    return api.delete(`/products/${id}`);
  },

  // Categories
  getCategories: () => {
    return api.get('/categories');
  },

  createCategory: (data) => {
    return api.post('/categories', data);
  },

  updateCategory: (id, data) => {
    return api.put(`/categories/${id}`, data);
  },

  deleteCategory: (id) => {
    return api.delete(`/categories/${id}`);
  },

  // Orders
  getOrders: (status = '', page = 1) => {
    return api.get('/orders', { params: { status, page } });
  },

  getOrder: (id) => {
    return api.get(`/orders/${id}`);
  },

  updateOrderStatus: (id, status) => {
    return api.put(`/orders/${id}/status`, { status });
  },

  // Users
  getUsers: (page = 1) => {
    return api.get('/users', { params: { page } });
  },

  getUser: (id) => {
    return api.get(`/users/${id}`);
  },

  blockUser: (id) => {
    return api.put(`/users/${id}/block`);
  },

  // Inquiries
  getInquiries: () => {
    return api.get('/inquiries');
  },

  updateInquiryStatus: (id, status) => {
    return api.put(`/inquiries/${id}/status`, { status });
  },

  // Payments
  getPayments: (status = '', page = 1) => {
    return api.get('/payments', { params: { status, page } });
  },

  // Settings
  getSettings: () => {
    return api.get('/settings');
  },

  updateSettings: (data) => {
    return api.put('/settings', data);
  },
};

export default api;

