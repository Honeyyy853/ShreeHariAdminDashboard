import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
  X,
  User,
  ChevronUp,
  ChevronDown,
  Plus,
  List,
  Leaf,
  Apple,
  Salad,
  SquareStar,
  BadgePercent,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose, isCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdowns, setOpenDropdowns] = useState({
    product: false,
    category: false,
  });

  // Menu items configuration
  const menuItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    {
      path: "#", // No navigation on parent click
      icon: FolderTree,
      label: "Category",
      hasSubmenu: true,
      submenu: [
        { path: "/add-category", label: "Add Category", icon: Plus },
        { path: "/categories", label: "Manage Categories", icon: List },
      ],
    },
    {
      path: "#", // No navigation on parent click
      icon: Leaf,
      label: "Herbs",
      hasSubmenu: true,
      submenu: [
        // { path: '/add-Herbs', label: 'Add Herbs', icon: Plus },
        { path: "/manage-Herbs", label: "Manage Herbs", icon: List },
      ],
    },
    
    {
      path: "#", // No navigation on parent click
      icon: Apple,
      label: "Dehydtared Fruits",
      hasSubmenu: true,
      submenu: [
        {
          path: "manage-DehydratedFruits",
          label: "Manage DehydratedFruits",
          icon: List,
        },
      ],
    },
    {
      path: "#", // No navigation on parent click
      icon: Salad,
      label: "Dehydtared Vegetables ",
      hasSubmenu: true,
      submenu: [
        {
          path: "manage-DehydratedVegetables ",
          label: "Manage DehydratedVegetables ",
          icon: List,
        },
      ],
    },
    
    { path: "/orders", icon: ShoppingCart, label: "Orders" },
    { path: "/users", icon: Users, label: "Users" },
    { path: "/inquiries", icon: MessageSquare, label: "Inquiries" },
    { path: "/payments", icon: CreditCard, label: "Payments" },
    { path: "/offers", icon: BadgePercent, label: "Offers" },
    { path: "/feedback", icon: SquareStar, label: "Feedback" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  // Check if a menu item is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname === path;
  };

  // Check if any submenu item is active
  const isAnySubmenuActive = (submenu) => {
    return submenu.some((subItem) => isActive(subItem.path));
  };

  // Toggle dropdown visibility
  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Auto-expand dropdowns if any submenu item is active
  useEffect(() => {
    const productItem = menuItems.find((item) => item.label === "Product");
    const categoryItem = menuItems.find((item) => item.label === "Category");

    if (productItem?.hasSubmenu) {
      const hasActiveSubmenu = isAnySubmenuActive(productItem.submenu);
      if (hasActiveSubmenu) {
        setOpenDropdowns((prev) => ({ ...prev, product: true }));
      }
    }

    if (categoryItem?.hasSubmenu) {
      const hasActiveSubmenu = isAnySubmenuActive(categoryItem.submenu);
      if (hasActiveSubmenu) {
        setOpenDropdowns((prev) => ({ ...prev, category: true }));
      }
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/login";
  };

  // User profile data
  const userProfile = {
    name: "Admin User",
    email: "admin@shreehariagritech.com",
    avatar: null,
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-primary text-white flex flex-col shadow-2xl z-50 transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-16" : "w-64"}`}
      >
        {/* User Profile Section */}
        <div
          className={`p-4 border-b border-primary-light relative transition-all duration-300 ${
            isCollapsed ? "px-2 py-4" : "py-4"
          }`}
        >
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              {userProfile.avatar ? (
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              isCollapsed ? "opacity-0 h-0" : "opacity-100 h-auto"
            }`}
          >
            <div className="flex items-center gap-3 mb-3 mt-3">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                {userProfile.avatar ? (
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-7 h-7 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-white truncate">
                  {userProfile.name}
                </h3>
                <p className="text-xs text-gray-300 truncate mt-0.5">
                  {userProfile.email}
                </p>
              </div>
            </div>
            <div className="h-px bg-primary-light"></div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 text-white hover:text-gray-200 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-2 scrollbar-hide">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const dropdownKey = item.label.toLowerCase();
            const isDropdownOpen = openDropdowns[dropdownKey];

            // Handle parent menu items with submenus
            if (item.hasSubmenu && item.submenu) {
              const isParentActive = isAnySubmenuActive(item.submenu);

              return (
                <div key={`menu-${item.label}`} className="mb-1">
                  {/* Parent menu item - only toggles dropdown, no navigation */}
                  <button
                    onClick={() => toggleDropdown(dropdownKey)}
                    className={`relative flex items-center w-full ${
                      isCollapsed ? "justify-center px-0 py-3" : "px-4 py-2.5"
                    } rounded-lg transition-all duration-200 group ${
                      isParentActive
                        ? "bg-accent text-white shadow-md"
                        : "text-gray-200 hover:bg-primary-light hover:text-white hover:shadow-sm"
                    }`}
                    title={isCollapsed ? item.label : ""}
                  >
                    <div className="flex items-center">
                      <Icon
                        className={`w-5 h-5 flex-shrink-0 ${
                          isCollapsed ? "" : "mr-3"
                        }`}
                      />
                      <span
                        className={`whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                          isCollapsed
                            ? "opacity-0 w-0 overflow-hidden"
                            : "opacity-100 w-auto ml-3"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    <span
                      className={`transition-all duration-300 ${
                        isCollapsed
                          ? "opacity-0 w-0 overflow-hidden"
                          : "opacity-100 w-auto ml-auto"
                      }`}
                    >
                      <ChevronUp
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-0" : "rotate-180"
                        }`}
                      />
                    </span>

                    {/* Submenu indicator icon for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute right-1">
                        {isDropdownOpen ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    )}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 top-0 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                        <div className="font-medium">{item.label}</div>
                        <div className="border-t border-gray-700 mt-1 pt-1">
                          {item.submenu.map((subItem, idx) => (
                            <div key={idx} className="py-0.5">
                              {subItem.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </button>

                  {/* Submenu items - Show when dropdown is open, even when collapsed */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isDropdownOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div
                      className={`space-y-1 ${
                        isCollapsed ? "mx-2 mt-1" : "ml-4 mt-1"
                      }`}
                    >
                      {item.submenu.map((subItem, idx) => {
                        const SubIcon = subItem.icon;
                        return (
                          <button
                            key={`${subItem.path}-${idx}`}
                            onClick={() => {
                              navigate(subItem.path);
                              // Close dropdown when navigating in collapsed mode
                              if (isCollapsed) {
                                setOpenDropdowns((prev) => ({
                                  ...prev,
                                  [dropdownKey]: false,
                                }));
                              }
                            }}
                            className={`flex items-center w-full text-left px-4 py-2 rounded-lg transition-all duration-200 transform hover:translate-x-1 ${
                              isActive(subItem.path)
                                ? "bg-accent text-white shadow-md"
                                : "text-gray-300 hover:bg-primary-light hover:text-white"
                            }`}
                          >
                            <span
                              className={`transition-all duration-300 ${
                                isCollapsed
                                  ? "opacity-0 w-0 overflow-hidden"
                                  : "opacity-100 w-auto mr-3"
                              }`}
                            >
                              <span className="w-2 h-2 rounded-full border-2 border-current flex-shrink-0"></span>
                            </span>
                            {isCollapsed && SubIcon && (
                              <SubIcon className="w-4 h-4 flex-shrink-0 mr-0" />
                            )}
                            <span
                              className={`text-sm font-medium transition-all duration-300 ${
                                isCollapsed
                                  ? "opacity-0 w-0 overflow-hidden"
                                  : "opacity-100 w-auto"
                              }`}
                            >
                              {subItem.label}
                            </span>

                            {/* Tooltip for submenu items when collapsed */}
                            {isCollapsed && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                                {subItem.label}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            // Regular menu items without submenus
            return (
              <button
                key={`menu-${item.label}`}
                onClick={() => navigate(item.path)}
                className={`relative flex items-center w-full ${
                  isCollapsed ? "justify-center px-0 py-3" : "px-4 py-2.5"
                } rounded-lg transition-all duration-200 group ${
                  active
                    ? "bg-accent text-white shadow-md"
                    : "text-gray-200 hover:bg-primary-light hover:text-white hover:shadow-sm"
                }`}
                title={isCollapsed ? item.label : ""}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isCollapsed ? "" : "mr-3"
                  }`}
                />
                <span
                  className={`whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                    isCollapsed
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto ml-3"
                  }`}
                >
                  {item.label}
                </span>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div
          className={`p-3 border-t border-primary-light transition-all duration-300 ${
            isCollapsed ? "px-2" : "px-2"
          }`}
        >
          <button
            onClick={handleLogout}
            className={`relative flex items-center w-full ${
              isCollapsed ? "justify-center px-0 py-3" : "px-4 py-2.5"
            } rounded-lg text-gray-200 hover:bg-primary-light hover:text-white transition-colors group`}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut
              className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? "" : "mr-3"}`}
            />
            <span
              className={`whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                isCollapsed
                  ? "opacity-0 w-0 overflow-hidden"
                  : "opacity-100 w-auto ml-3"
              }`}
            >
              Logout
            </span>

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                Logout
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
