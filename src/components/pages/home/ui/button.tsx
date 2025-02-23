import React from "react";
import { useNavigate } from "react-router-dom";

export default function Button({ url }: { url: string }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(url)}
      className="group relative mt-auto h-9 w-full cursor-pointer items-center justify-center overflow-x-hidden rounded-sm bg-gradient-custom text-base font-semibold duration-300"
    >
      <div className="absolute right-full top-0 z-1 flex h-full w-full items-center justify-center bg-image duration-300 group-hover:right-0">
        Click here!
      </div>
      <div className="absolute left-0 top-0 z-1 flex h-full w-full items-center justify-center bg-pink duration-300 group-hover:left-full">
        Play Game
      </div>
    </button>
  );
}
