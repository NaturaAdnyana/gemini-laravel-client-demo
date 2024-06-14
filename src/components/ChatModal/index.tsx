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
import { faker } from "@faker-js/faker";
interface Message {
  id: number;
  message: string;
  isUser?: string;
  image?: string;
}

interface Question {
  id: number;
  title: string;
  payload: string;
}

export default function index() {
  const messageContainer = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [suggestions, setSuggestions] = useState<Question[]>([]);
  const [needSuggestions, setNeedSuggestions] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    const initialMessage: Message[] = [
      {
        id: messages.length + 1,
        message:
          "Selamat datang, saya IQA (INSTIKI Quick Assistant) siap melayani anda👋",
      },
      {
        id: messages.length + 2,
        message:
          "Jika anda mahasiswa INSTIKI, silahkan kirimkan data Nama dan NIM anda terlebih dahulu.",
      },
      {
        id: messages.length + 3,
        message: "Contoh: 'Nama saya [nama anda] NIM [NIM anda]'",
      },
      {
        id: messages.length + 4,
        message:
          "Namun, jika anda pengunjung, silahkan langsung ajukan pertanyaan anda di kolom di bawah ini😊",
      },
    ];

    setMessages([...messages, ...initialMessage]);
    setIsLoaded(true);
    setSuggestions(initialQuestions.questions);
    setUser(faker.person.firstName());
  }, []);

  const handleMessageSubmit = (payload: string, title?: string) => {
    setIsSending(true);
    setNeedSuggestions(false);

    let message = title ? title : payload;

    const newMessage: Message = {
      id: messages.length + 1,
      message: message,
      isUser: user,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsLoaded(false);

    axios
      .post("https://eventnya.id:50/webhooks/rest/webhook", {
        sender: user,
        message: message,
      })
      .then(function (response) {
        const botMessage = response.data.map((item: any, index: number) => {
          const messageData: Message = {
            id: messages.length + index + 2,
            message: item.text || undefined,
            image: item.image || undefined,
          };
          if (item.buttons && item.buttons.length > 0) {
            setNeedSuggestions(true);
            setSuggestions(
              item.buttons.map((button: any, index: number) => ({
                id: index + 1,
                title: button.title,
                payload: button.payload,
              }))
            );
          }
          return messageData;
        });
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
              "Mohon maaf, saat ini IQA mengalami gangguan, mohon doanya agar bisa segera pulih 🥲🙏",
          },
          {
            id: messages.length + 3,
            message:
              "Jika membutuhkan informasi segera, silahkan menghubungi Information Center kami: https://wa.me/6281339822383",
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
    // console.log(messages);
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
          <b>Halo Civitas INSTIKI</b>
          <br />
          Saya IQA siap membantu anda😉
        </h1>
      </motion.div>
      <div className="bg-slate-50 w-full h-[25rem] rounded-[21px] relative overflow-hidden flex flex-col">
        <motion.div
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
        </motion.div>
        <div className="p-2 pt-3 w-full backdrop-blur-sm shadow-top bg-slate-50">
          {needSuggestions && (
            <div className="flex flex-wrap-reverse gap-2 justify-end items-end mb-2 mr-1">
              {suggestions.map((suggestion) => (
                <SuggestionPill
                  key={suggestion.id}
                  title={suggestion.title}
                  payload={suggestion.payload}
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
    </motion.div>
  );
}
