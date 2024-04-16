import ChatbotButton from "./components/ChatbotButton";
import ChatModal from "./components/ChatModal";

function App() {
  return (
    <div className="fixed bottom-5 right-0 p-2 flex flex-col items-end w-full md:w-[30rem] md:right-5">
      <ChatModal />
      <ChatbotButton />
    </div>
  );
}

export default App;
