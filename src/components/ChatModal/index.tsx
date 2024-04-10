import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import SuggestionPill from "../SuggestionPill";
import robot from "./../../robot.json";
import "./index.css";
import initialQuestions from "../../data/initial-questions.json";

export default function index() {
  return (
    <motion.div className="modal-gradient mb-5 rounded-3xl p-1">
      <div className="w-full p-5 flex flex-col items-center justify-center text-center text-white">
        <div className="w-14 h-14">
          <Lottie animationData={robot} loop={true} />
        </div>
        <h1 className="text-sm leading-6">
          <b>Halo Civitas INSTIKI</b>
          <br />
          Perkenalkan saya IQA siap membantu anda👋
        </h1>
      </div>
      <div className="bg-slate-50 w-96 h-96 rounded-[20px] relative">
        <div className="absolute bottom-0 right-0 flex flex-wrap-reverse gap-2 justify-end items-end p-3">
          {initialQuestions.questions.map((question, index) => (
            <SuggestionPill key={question.id}>
              {question.question}
            </SuggestionPill>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
