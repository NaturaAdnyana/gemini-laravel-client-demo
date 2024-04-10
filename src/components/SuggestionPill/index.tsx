import React from "react";

export default function index({ children }) {
  return (
    <div className="border border-yellow-600 rounded-full py-2 px-3 text-xs text-yellow-600 bg-white whitespace-nowrap">
      {children}
    </div>
  );
}
