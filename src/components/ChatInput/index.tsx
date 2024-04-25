import React, { useState } from "react";
import Plane from "../../assets/Plane";

const index: React.FC<{
  onMessageSubmit: (message: string) => void;
  isSending: boolean;
}> = ({ onMessageSubmit, isSending }) => {
  const [inputText, setInputText] = useState<string>("");

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
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-[1.5rem] py-3 px-4 border focus:outline-none min-h-12 h-12 max-h-24 scroll-py-3"
        placeholder={isSending ? "Mengirim pesan..." : "Ketik pesan..."}
        disabled={isSending}
      />
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
