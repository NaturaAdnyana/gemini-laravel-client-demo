import React, { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import SuggestionPill from "../SuggestionPill";
import ChatInput from "../ChatInput";
import ChatBubble from "../ChatBubble";
import robot from "./../../assets/robot.json";
import "./index.css";
import initialQuestions from "../../data/initial-questions.json";
interface Message {
  id: number;
  message: string;
  isUser?: boolean;
}

export default function index() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleMessageSubmit = (message: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      message: message,
      isUser: true,
    };

    setMessages([...messages, newMessage]);
  };
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
      <div className="bg-slate-50 max-w-[30rem] max-h-[60vh] rounded-[21px] relative overflow-hidden flex flex-col">
        <div className="p-2 pb-3 w-full h-full min-h-48 overflow-y-auto flex flex-col">
          {messages.map((msg) => (
            <ChatBubble isUser={msg.isUser} key={msg.id}>
              {msg.message}
            </ChatBubble>
          ))}
        </div>
        <div className="p-2 pt-3 w-full backdrop-blur-sm shadow-top bg-slate-50">
          <div className="flex flex-wrap-reverse gap-2 justify-end items-end mb-2 mr-1">
            {initialQuestions.questions.map((question, index) => (
              <SuggestionPill key={question.id}>
                {question.question}
              </SuggestionPill>
            ))}
          </div>
          <ChatInput onMessageSubmit={handleMessageSubmit} />
        </div>
      </div>
    </motion.div>
  );
}
