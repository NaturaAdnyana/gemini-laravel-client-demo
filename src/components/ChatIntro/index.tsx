import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const index: React.FC<{
  onIntroSubmit: (backendUrl: string, username: string) => void;
}> = ({ onIntroSubmit }) => {
  const [username, setUsername] = useState<string>("");
  const [backendUrl, setBackendUrl] = useState<string>("");
  const [isSended, setIsSended] = useState(false);

  const handleUsernameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.trim() === "") return;

    onIntroSubmit(backendUrl.trim(), username.trim());
    setIsSended(true);
  };

  return (
    <motion.div
      key="intro"
      className="absolute top-0 left-0 p-10 w-full h-full bg-white shadow-md rounded-[21px]"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      // exit={{
      //   top: "-100%",
      //   transition: { delay: 0.3, duration: 0.5 },
      // }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mt-5">Selamat datang di Gadget.id</h1>
        <p className="text-center text-gray-400 mt-2">
          Silahkan masukkan username Anda untuk memulai chat.
        </p>
        <form
          className="mt-5 w-full flex flex-col items-center gap-y-3"
          onSubmit={handleUsernameSubmit}
        >
          <input
            value={backendUrl}
            onChange={(e) => setBackendUrl(e.target.value.replace(/\s/g, ""))}
            type="text"
            className="w-full py-2 px-3 border border-gray-200 rounded-lg focus:outline-1 focus:outline-orange-700"
            placeholder="Backend URL"
            name="backend-url"
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
            type="text"
            className="w-full py-2 px-3 border border-gray-200 rounded-lg focus:outline-1 focus:outline-orange-700"
            placeholder="Username"
            name="username"
          />
          <button
            className="bg-orange-700 text-white rounded-lg px-5 py-2 mt-3 w-full transition-all active:scale-[0.98] hover:bg-orange-600"
            disabled={isSended}
          >
            {isSended ? "Berhasil" : "Mulai Chat"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default index;
