import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import SuggestionPill from "../SuggestionPill";
import ChatInput from "../ChatInput";
import ChatBubble from "../ChatBubble";
import robot from "./../../assets/robot.json";
import textLoading from "./../../assets/text-loading.json";
import "./index.css";
import initialQuestions from "../../data/initial-questions.json";
interface Message {
  id: number;
  message: string;
  isUser?: string;
  image?: string;
}

export default function index() {
  const messageContainer = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [needSuggestions, setNeedSuggestions] = useState(true);

  useEffect(() => {
    const initialMessage: Message = {
      id: messages.length + 1,
      message:
        "Selamat datang! Saya IQA siap membantu Anda. Silakan ajukan pertanyaan Anda di kolom di bawah ini. Namun, jika Anda perlu menghubungi admin, Anda dapat melakukannya melalui tautan berikut: https://wa.me/6281339822383",
    };

    setMessages([...messages, initialMessage]);
    setIsLoaded(true);
  }, []);

  const handleMessageSubmit = (message: string) => {
    setNeedSuggestions(false);

    const newMessage: Message = {
      id: messages.length + 1,
      message: message,
      isUser: "client",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsLoaded(false);

    axios
      .post("http://localhost:5005/webhooks/rest/webhook", {
        sender: "client",
        message: message,
      })
      .then(function (response) {
        console.log(response);
        const botMessage = response.data.map((item: any, index: number) => ({
          id: messages.length + index + 2,
          message: item.text || undefined,
          image: item.image || undefined,
        }));
        setMessages((prevMessages) => [...prevMessages, ...botMessage]);
        setIsLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (messageContainer.current) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
    console.log(messages);
  }, [messages]);

  return (
    <motion.div className="modal-gradient mb-5 rounded-3xl p-1 w-full">
      <div className="w-full p-5 flex flex-col items-center justify-center text-center text-white">
        <div className="w-14 h-14">
          <Lottie animationData={robot} loop={true} />
        </div>
        <h1 className="text-sm leading-6">
          <b>Halo Civitas INSTIKI</b>
          <br />
          Saya IQA siap membantu anda 💪🏻
        </h1>
      </div>
      <div className="bg-slate-50 w-full h-[25rem] rounded-[21px] relative overflow-hidden flex flex-col">
        <div
          ref={messageContainer}
          className="p-2 pb-5 w-full h-full overflow-y-auto flex flex-col"
        >
          {messages.map((msg) => (
            <ChatBubble
              isLoaded={true}
              isUser={msg.isUser}
              key={msg.id}
              image={msg.image}
            >
              {msg.message}
            </ChatBubble>
          ))}
          {!isLoaded && (
            <ChatBubble isLoaded={false} isUser={false} image={null}>
              <Lottie animationData={textLoading} loop={true} />
            </ChatBubble>
          )}
        </div>
        <div className="p-2 pt-3 w-full backdrop-blur-sm shadow-top bg-slate-50">
          {needSuggestions && (
            <div className="flex flex-wrap-reverse gap-2 justify-end items-end mb-2 mr-1">
              {initialQuestions.questions.map((question) => (
                <SuggestionPill
                  key={question.id}
                  onMessageSubmit={handleMessageSubmit}
                >
                  {question.question}
                </SuggestionPill>
              ))}
            </div>
          )}
          <ChatInput onMessageSubmit={handleMessageSubmit} />
        </div>
      </div>
    </motion.div>
  );
}
