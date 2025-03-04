import React from "react";
import Lottie from "lottie-react";
import textLoading from "./../../assets/text-loading.json";
import { motion } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./index.css";

const renderLink = ({ attributes, content }) => {
  const { href, ...props } = attributes;
  return (
    <a
      href={href}
      {...props}
      target="_blank"
      className="text-cyan-600 underline break-words after:content-['↗'] after:text-[8px]"
    >
      {content}
    </a>
  );
};

export default function index({ children, isUser, isLoaded }) {
  return (
    <motion.div
      className={`m-1 p-2 rounded-br-[14px] rounded-bl-[14px] max-w-96 bubble-shadow text-[0.85rem] ${
        isUser
          ? "self-end bg-white rounded-tl-[14px] rounded-tr-[4px]"
          : "self-start bg-orange-200 rounded-tr-[14px] rounded-tl-[4px]"
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
      exit={{ opacity: 0, y: 50 }}
    >
      {isLoaded ? (
        <Markdown remarkPlugins={[remarkGfm]}>{children}</Markdown>
      ) : (
        <Lottie className="w-12" animationData={textLoading} loop={true} />
      )}
    </motion.div>
  );
}
