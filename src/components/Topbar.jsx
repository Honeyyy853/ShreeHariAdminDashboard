import React, { useState } from 'react';
import { Search, Bell, User, Menu, Settings, LogOut } from 'lucide-react';

/**
 * Topbar Component
 * Search bar, notifications, and user profile
 */
const Topbar = ({ onMenuClick, sidebarCollapsed }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Dummy notifications
  const notifications = [
    { id: 1, message: 'New order received', time: '5 min ago', read: false },
    { id: 2, message: 'Low stock alert: Organic Seeds', time: '1 hour ago', read: false },
    { id: 3, message: 'Payment received: ₹2,500', time: '2 hours ago', read: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-3 sm:px-4 lg:px-6 z-30 transition-all duration-300 ${
      sidebarCollapsed ? 'lg:left-16 left-0' : 'lg:left-64 left-0'
    }`}>
      {/* Menu Toggle Button - Visible on all screen sizes */}
      <button
        onClick={onMenuClick}
        className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95"
        title="Toggle Sidebar"
      >
        <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-md ml-2 lg:ml-4 hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products, orders, users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm transition-all duration-200 hover:border-gray-400"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
        {/* Mobile Search Button */}
        <button
          className="sm:hidden p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-all duration-200"
          onClick={() => {
            // You can add mobile search modal here
            alert('Mobile search - implement modal');
          }}
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications */}
        {/* <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95"
          >
            <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-accent rounded-full text-xs text-white flex items-center justify-center font-semibold shadow-sm animate-pulse">
                {unreadCount}
              </span>
            )}
          </button> */}

          {/* Notifications Dropdown */}
          {/* {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-20 animate-slideDown overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs bg-accent text-white px-2 py-1 rounded-full font-medium">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto scrollbar-hide">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification, idx) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                          !notification.read ? 'bg-blue-50/50' : ''
                        }`}
                        style={{
                          animation: `fadeInSlide 0.3s ease-out ${idx * 0.05}s both`,
                        }}
                        onClick={() => setShowNotifications(false)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            !notification.read ? 'bg-primary' : 'bg-gray-300'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 font-medium">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-3 border-t border-gray-200 bg-gray-50">
                    <button className="w-full text-sm text-primary hover:text-primary-dark font-medium">
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div> */}

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 active:scale-95"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-sm ring-2 ring-white">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">Admin</span>
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowProfile(false)}
              />
              <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-20 animate-slideDown overflow-hidden">
                <div className="p-3 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-sm">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Admin User</p>
                      <p className="text-xs text-gray-500">admin@shreehariagritech.com</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Change Password
                  </button>
                  <hr className="my-2 border-gray-200" />
                  <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;

