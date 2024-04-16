import Lottie from "lottie-react";
import robot from "./../../assets/robot.json";

import React from "react";

export default function ChatbotButton({onClick}) {
  return (
    <button className="w-14 h-14 rounded-full bg-orange-700 flex items-center justify-center p-2 md:w-20 sm:h-20" onClick={onClick}>
      <Lottie animationData={robot} loop={true} />
    </button>
  );
}
