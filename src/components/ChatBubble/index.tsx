import React from "react";
import Lottie from "lottie-react";
import textLoading from "./../../assets/text-loading.json";

export default function index({ children, isUser, isLoaded, link }) {
  return (
    <div
      className={`m-2 py-2 px-5 rounded-[14px] max-w-72 shadow-sm ${
        isUser ? "self-end bg-white" : "self-start bg-orange-100"
      }`}
    >
      {link && (
        <a className="text-blue-500 underline" href={link} target="_blank">
          {link}
        </a>
      )}
      {isLoaded ? (
        children
      ) : (
        <Lottie className="w-12" animationData={textLoading} loop={true} />
      )}
    </div>
  );
}
