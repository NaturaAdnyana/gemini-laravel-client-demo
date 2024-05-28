import { useState } from "react";
import ChatbotButton from "./components/ChatbotButton";
import ChatModal from "./components/ChatModal";
import { AnimatePresence } from "framer-motion";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="fixed bottom-5 right-0 p-2 flex flex-col items-end w-full md:w-[34rem] md:right-5">
      <AnimatePresence>{isModalOpen && <ChatModal />}</AnimatePresence>
      <ChatbotButton onClick={toggleModal} isOpen={isModalOpen} />
    </div>
  );
}

export default App;
