import React from "react";
import { delay, motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { delay: 1 } },
};

const index: React.FC<{
  onMessageSubmit: (message: string) => void;
  children: React.ReactNode;
}> = ({ onMessageSubmit, children }) => {
  const handleMessageSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (typeof children === "string") {
      onMessageSubmit(children);
    } else {
      console.error("Invalid child type. Expected string.");
    }
  };
  return (
    <motion.button
      className="border border-yellow-600 rounded-full py-2 px-3 text-xs text-yellow-600 bg-white whitespace-nowrap transition-colors hover:bg-orange-100"
      onClick={handleMessageSubmit}
      variants={item}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.button>
  );
};

export default index;
