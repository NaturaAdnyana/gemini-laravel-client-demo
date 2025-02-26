import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import SuggestionPill from "../SuggestionPill";
import ChatInput from "../ChatInput";
import ChatBubble from "../ChatBubble";
import ChatIntro from "../ChatIntro";
import robot from "./../../assets/robot.json";
import textLoading from "./../../assets/text-loading.json";
import "./index.css";
import initialQuestions from "../../data/initial-questions.json";
interface Message {
  message: string;
  isUser?: string;
}

interface Question {
  id: number;
  message: string;
}

export default function index() {
  const messageContainer = useRef<HTMLDivElement>(null);
  const [isUser, setIsUser] = useState<string>("");
  const [backendUrl, setBackendUrl] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [suggestions, setSuggestions] = useState<Question[]>([]);
  const [needSuggestions, setNeedSuggestions] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    const initialMessage: Message[] = [
      {
        message:
          "Selamat datang, silahkan isi pertanyaan anda di bawah ini, saya siap membantu anda 😊",
      },
    ];

    setMessages([...messages, ...initialMessage]);
    setIsLoaded(true);
    setSuggestions(initialQuestions.questions);
  }, []);

  const handleIntroSubmit = (backendUrl: string, username: string) => {
    setBackendUrl(backendUrl);
    setIsUser(username);
  };

  const handleMessageSubmit = (message: string) => {
    setIsSending(true);
    setNeedSuggestions(false);

    const newMessage: Message = {
      message: message,
      isUser: isUser,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsLoaded(false);

    axios
      .post(backendUrl, {
        username: isUser,
        message: message,
      })
      .then(function (response) {
        const botMessage = [
          {
            message: response.data.reply,
          },
        ];
        setMessages((prevMessages) => [...prevMessages, ...botMessage]);
        setIsLoaded(true);
        setIsSending(false);
      })
      .catch(function (error) {
        console.log(error);
        const errorMessage = [
          {
            id: messages.length + 2,
            message:
              "Mohon maaf, saat ini mengalami gangguan, mohon doanya agar bisa segera pulih 🥲🙏",
          },
        ];
        setMessages((prevMessages) => [...prevMessages, ...errorMessage]);
        setIsLoaded(true);
        setIsSending(false);
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
    <motion.div
      className="modal-gradient mb-5 rounded-3xl p-1 w-full"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full p-5 flex flex-col items-center justify-center text-center text-white"
        initial={{ y: 50 }}
        animate={{ y: 0, transition: { delay: 0.1 } }}
      >
        <div className="w-14 h-14">
          <Lottie animationData={robot} loop={true} />
        </div>
        <h1 className="text-sm leading-6">
          {isUser ? <b>Halo {isUser}</b> : <b>Selamat Datang di Gadget.id</b>}
          <br />
          Saya siap membantu anda😉
        </h1>
      </motion.div>
      <div className="bg-slate-50 w-full h-[25rem] rounded-[21px] relative overflow-hidden">
        {isUser && (
          <div className="flex flex-col h-full">
            <motion.div
              ref={messageContainer}
              className="p-2 pb-5 w-full h-full overflow-y-auto flex flex-col"
            >
              {messages.map((msg, id) => (
                <ChatBubble isLoaded={true} isUser={msg.isUser} key={id}>
                  {msg.message}
                </ChatBubble>
              ))}
              {!isLoaded && (
                <ChatBubble isLoaded={false} isUser={false}>
                  <Lottie animationData={textLoading} loop={true} />
                </ChatBubble>
              )}
            </motion.div>
            <div className="p-2 pt-3 w-full backdrop-blur-sm shadow-top bg-slate-50">
              {needSuggestions && (
                <div className="flex flex-wrap-reverse gap-2 justify-end items-end mb-2 mr-1">
                  {suggestions.map((suggestion) => (
                    <SuggestionPill
                      key={suggestion.id}
                      message={suggestion.message}
                      onMessageSubmit={handleMessageSubmit}
                    />
                  ))}
                </div>
              )}
              <ChatInput
                isSending={isSending}
                onMessageSubmit={handleMessageSubmit}
              />
            </div>
          </div>
        )}
        <AnimatePresence>
          {!isUser && <ChatIntro onIntroSubmit={handleIntroSubmit} />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
