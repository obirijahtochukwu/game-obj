import React, { Dispatch, FormEvent, useState } from "react";
import Modal from "./modal";

export default function DeleteUI({
  title,
  description,
  isOpen,
  setIsOpen,
  onClick,
  isLoading,
}: {
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  onClick: () => void;
  isLoading: boolean;
}) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} classname="!p-4">
      <article className="w-full font-advance text-primary">
        <div className="font-secondary text-xl font-semibold">{title}</div>
        <div className="mt-1 text-sm text-grey">{description}</div>

        <div className="mt-12 flex justify-end gap-3">
          <button onClick={() => setIsOpen(false)} className="h-9 rounded-sm bg-dark px-3 text-base">
            Cancel
          </button>
          <button type="button" onClick={onClick} className="flex h-9 items-center rounded-sm bg-danger px-3 text-base">
            {isLoading ? (
              <div className="scale-50">
                <div className="spinner"></div>
              </div>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </article>
    </Modal>
  );
}
