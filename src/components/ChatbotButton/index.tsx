import Lottie from "lottie-react";
import robot from "./../../assets/robot.json";
import close from "./../../assets/close.json";
import { motion } from "framer-motion";

import React from "react";

export default function ChatbotButton({ onClick, isOpen }) {
  return (
    <button
      className="w-16 h-16 rounded-full bg-orange-700 flex items-center justify-center p-2 md:w-20 sm:h-20 transition-colors hover:bg-orange-600"
      onClick={onClick}
    >
      {isOpen ? (
        <Lottie className="w-10 h-10" animationData={close} loop={false} />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Lottie animationData={robot} loop={true} />
        </motion.div>
      )}
    </button>
  );
}
