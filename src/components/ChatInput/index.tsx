import React, { useEffect, useState } from "react";
import Plane from "../../assets/Plane";
import Mic from "../../assets/Mic";

const index: React.FC<{
  onMessageSubmit: (message: string) => void;
  isSending: boolean;
}> = ({ onMessageSubmit, isSending }) => {
  const [inputText, setInputText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    if (
      !("SpeechRecognition" in window) &&
      !("webkitSpeechRecognition" in window)
    ) {
      console.error("Your browser does not support the Web Speech API");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition() as SpeechRecognition;
    recognitionInstance.lang = "id-ID";
    recognitionInstance.interimResults = false;
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInputText((prevText) => prevText + transcript + " ");
    };

    recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Error occurred in recognition: ", event.error);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    setRecognition(() => recognitionInstance);

    return () => {
      recognitionInstance.stop();
    };
  }, []);

  const handleMicClick = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
      setIsListening(!isListening);
    }
  };

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputText.trim() === "") return;

    onMessageSubmit(inputText.trim());
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleMessageSubmit(e as any);
    }
  };

  return (
    <form className="flex gap-2" onSubmit={handleMessageSubmit}>
      <div className="w-full relative">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-[1.5rem] py-[0.65rem] px-4 border focus:outline-none min-h-12 h-12 max-h-24 scroll-py-3"
          placeholder={isSending ? "Mengirim pesan..." : "Ketik pesan..."}
          disabled={isSending}
        />
        <button
          type="button"
          onClick={handleMicClick}
          className="w-10 h-10 backdrop-blur-lg flex items-center justify-center rounded-full transition-all group absolute top-1 right-1"
        >
          <Mic className="stroke-gray-600 group-hover:stroke-black w-5 h-5" />
        </button>
      </div>
      <button
        type="submit"
        className=" bg-orange-700 w-14 h-12 flex items-center justify-center rounded-full transition-all hover:bg-orange-600 hover:-rotate-45"
      >
        <Plane className="stroke-white w-5 h-5 -rotate-12" />
      </button>
    </form>
  );
};

export default index;
