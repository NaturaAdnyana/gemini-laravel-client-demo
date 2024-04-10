import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import robot from "./../../robot.json";
import "./index.css";

export default function index() {
  return (
    <motion.div className="modal-gradient mb-5 rounded-3xl p-1">
      <div className="w-full p-5 flex flex-col items-center justify-center text-center text-white">
        <div className="w-14 h-14">
          <Lottie animationData={robot} loop={true} />
        </div>
        <h1 className="text-xs leading-5">
          <b>Halo Civitas INSTIKI</b>
          <br />
          Perkenalkan saya IQA siap membantu anda👋
        </h1>
      </div>
      <div className="bg-white w-96 h-96 rounded-[20px]"></div>
    </motion.div>
  );
}
