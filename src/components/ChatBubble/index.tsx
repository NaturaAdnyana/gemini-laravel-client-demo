import React from "react";
import Lottie from "lottie-react";
import textLoading from "./../../assets/text-loading.json";
import Linkify from "linkify-react";
import { motion } from "framer-motion";

const renderLink = ({ attributes, content }) => {
  const { href, ...props } = attributes;
  return (
    <a
      href={href}
      {...props}
      target="_blank"
      className="text-cyan-600 underline break-words after:content-['_↗'] after:text-xs"
    >
      {content}
    </a>
  );
};

export default function index({ children, isUser, isLoaded, image }) {
  return (
    <motion.div
      className={`m-1 p-3 rounded-[14px] max-w-72 shadow-sm text-sm ${
        isUser ? "self-end bg-white" : "self-start bg-orange-100"
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      exit={{ opacity: 0, y: 50 }}
    >
      {image && <img className="rounded-lg" src={image} />}
      {isLoaded ? (
        <Linkify options={{ render: renderLink }}>{children}</Linkify>
      ) : (
        <Lottie className="w-12" animationData={textLoading} loop={true} />
      )}
    </motion.div>
  );
}
