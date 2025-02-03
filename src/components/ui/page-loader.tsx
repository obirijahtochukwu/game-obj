import React from "react";

export default function PageLoader({ isLoading }: { isLoading: boolean }) {
  return (
    <div
      className={`${isLoading ? "visible opacity-100" : "invisible opacity-0"} fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-advance`}
    >
      <div className="spinner" />
    </div>
  );
}
