import React from "react";
import Plane from "../../assets/Plane";

export default function index() {
  return (
    <form className="relative h-12" onSubmit={alert("works")}>
      <input
        type="text"
        className="w-full h-12 rounded-[16px] p-2 border"
        placeholder="Ketik disini..."
      />
      <button
        type="submit"
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-700 w-14 h-10 flex items-center justify-center rounded-[14px]"
      >
        <Plane className="stroke-white w-6 h-6" />
      </button>
    </form>
  );
}
