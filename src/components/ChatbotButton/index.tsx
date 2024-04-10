import Lottie from "lottie-react";
import robot from "./../../robot.json";

import React from "react";

export default function ChatbotButton() {
  return (
    <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center p-2">
      <Lottie animationData={robot} loop={true} />
    </div>
  );
}
