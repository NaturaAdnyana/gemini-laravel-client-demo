import React, { useState } from "react";
import Plane from "../../assets/Plane";

const index: React.FC<{ onMessageSubmit: (message: string) => void }> = ({
  onMessageSubmit,
}) => {
  const [inputText, setInputText] = useState<string>("");

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    onMessageSubmit(inputText.trim());
    setInputText("");
  };
  return (
    <form className="relative h-12" onSubmit={handleMessageSubmit}>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        type="text"
        className="w-full h-12 rounded-[16px] p-2 border focus:outline-none"
        placeholder="Ketik disini..."
      />
      <button
        type="submit"
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-700 w-14 h-10 flex items-center justify-center rounded-[14px] transition-colors hover:bg-orange-600"
      >
        <Plane className="stroke-white w-6 h-6" />
      </button>
    </form>
  );
};

export default index;
