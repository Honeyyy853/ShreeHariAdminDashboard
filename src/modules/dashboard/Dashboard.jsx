import React from "react";

const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
