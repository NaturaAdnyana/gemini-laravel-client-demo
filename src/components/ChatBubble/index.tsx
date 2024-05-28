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
      className="text-cyan-600 underline break-words after:content-['↗'] after:text-xs"
    >
      {/* {content} */}
      link
    </a>
  );
};

export default function index({ children, isUser, isLoaded, image }) {
  return (
    <motion.div
      className={`m-1 p-3 rounded-br-[14px] rounded-bl-[14px] max-w-96 shadow-sm text-[0.85rem] ${
        isUser
          ? "self-end bg-white rounded-tl-[14px]"
          : "self-start bg-orange-100 rounded-tr-[14px]"
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      exit={{ opacity: 0, y: 50 }}
    >
      {image && (
        <a
          className="relative"
          href={image}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="rounded-lg" src={image} />
          <div className="absolute flex justify-center items-center rounded-lg top-0 left-0 w-full h-full transition-opacity bg-[#0000006d] opacity-0 hover:opacity-100">
            <span className="text-white after:content-['_↗'] underline underline-offset-2">
              Open Image
            </span>
          </div>
        </a>
      )}
      {isLoaded ? (
        <Linkify options={{ render: renderLink }}>{children}</Linkify>
      ) : (
        <Lottie className="w-12" animationData={textLoading} loop={true} />
      )}
    </motion.div>
  );
}
