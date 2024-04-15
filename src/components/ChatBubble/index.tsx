import React from "react";

export default function index({ children, isUser }) {
  return (
    <div
      className={`m-2 p-2 rounded-[14px] max-w-72 ${
        isUser ? "self-end bg-white" : "self-start bg-orange-100"
      }`}
    >
      <h1>{children}</h1>
    </div>
  );
}
