import { useState } from "react";
import ChatbotButton from "./components/ChatbotButton";
import ChatModal from "./components/ChatModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="fixed bottom-5 right-0 p-2 flex flex-col items-end w-full md:w-[30rem] md:right-5">
      {isModalOpen && <ChatModal isOpen={isModalOpen} />}
      <ChatbotButton onClick={toggleModal} />
    </div>
  );
}

export default App;
