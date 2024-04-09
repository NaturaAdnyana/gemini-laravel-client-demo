import ChatbotButton from "./components/ChatbotButton";
import ChatModal from "./components/ChatModal";

function App() {
  return (
    <div className="fixed bottom-5 right-5">
      <ChatModal />
      <ChatbotButton />
    </div>
  );
}

export default App;
