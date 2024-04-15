import React from "react";

export default function index({ children, isUser }) {
  return (
    <div
      className={`m-2 py-2 px-5 rounded-[14px] max-w-72 shadow-sm ${
        isUser ? "self-end bg-white" : "self-start bg-orange-100"
      }`}
    >
      <h1>{children}</h1>
    </div>
  );
}
