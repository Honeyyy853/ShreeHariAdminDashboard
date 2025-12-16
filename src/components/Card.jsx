import React from "react";

/**
 * Reusable Card Component
 * Used for displaying content in a card layout
 * Responsive padding with enhanced styling
 */
const Card = ({ children, className = "", onClick, hover = true }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 transition-all duration-300 ${
        onClick || hover
          ? "cursor-pointer hover:shadow-lg hover:border-gray-200 hover:-translate-y-0.5"
          : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
