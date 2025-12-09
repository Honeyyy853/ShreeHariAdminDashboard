import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

// Pages
import Login from "./modules/auth/Login";
import Dashboard from "./modules/dashboard/Dashboard";
import EditProduct from "./modules/Herbs/EditProduct";
import ListCategories from "./modules/categories/ListCategories";
import AddCategory from "./modules/categories/AddCategory";
import EditCategory from "./modules/categories/EditCategory";
import Orders from "./modules/orders/Orders";
// import OrderDetails from './modules/orders/OrderDetails';
import Users from "./modules/users/Users";
import Inquiries from "./modules/users/Inquiries";
import Payments from "./modules/orders/Payments";
import Settings from "./modules/settings/Settings";
import ListHerbs from "./modules/Herbs/ListHerbs";
import ListDehydratedFruits from "./modules/Dehydrated Fruit/ListDehydratedFruits";
import ListDehydratedVegetables from "./modules/Dehydtared Vegetables/ListDehydratedVegetables";
/**
 * Protected Route Component
 * Checks if user is authenticated before allowing access
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("admin_token");
  return token ? children : <Navigate to="/login" replace />;
};

/**
 * Public Route Component
 * Redirects to dashboard if already logged in
 */
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("admin_token");
  return token ? <Navigate to="/" replace /> : children;
};

/**
 * Main Layout Component
 * Wraps protected routes with sidebar and topbar
 */
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    // On mobile (< 1024px), toggle visibility
    // On desktop (>= 1024px), toggle collapsed state
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Handle window resize to sync states
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // On desktop, sidebar should always be visible
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        isCollapsed={sidebarCollapsed}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        <Topbar
          onMenuClick={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />
        <main className="flex-1 overflow-y-auto pt-16 page-transition">
          {children}
        </main>
      </div>
    </div>
  );
};

/**
 * Main App Component
 * Sets up routing and authentication
 */
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Layout>
                <ListProducts />
              </Layout>
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/manage-Herbs"
          element={
            <ProtectedRoute>
              <Layout>
                <ListHerbs />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-DehydratedFruits"
          element={
            <ProtectedRoute>
              <Layout>
                <ListDehydratedFruits />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-DehydratedVegetables"
          element={
            <ProtectedRoute>
              <Layout>
                <ListDehydratedVegetables />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditProduct />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Layout>
                <ListCategories />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-category"
          element={
            <ProtectedRoute>
              <Layout>
                <AddCategory />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-category/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditCategory />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Layout>
                <Orders />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <OrderDetails />
              </Layout>
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout>
                <Users />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inquiries"
          element={
            <ProtectedRoute>
              <Layout>
                <Inquiries />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Layout>
                <Payments />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
