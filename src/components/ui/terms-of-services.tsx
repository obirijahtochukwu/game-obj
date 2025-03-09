import React, { Dispatch, FormEvent, useEffect, useState } from "react";
import Modal from "./modal";
import { Buttons } from "./buttons";
import { useGlobalContext } from "../../lib/global-context";
import axios from "axios";
import { backend_api } from "../../lib/constants";

export default function TermsOfServices({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Dispatch<boolean> }) {
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { admin, setRefresh } = useGlobalContext();
  const [terms, setTerms] = useState(admin?.terms_of_service);

  const updateTermsOfServices = (e: FormEvent) => {
    e.preventDefault();
    axios
      .put(backend_api + "/update-terms-of-ervices", { terms })
      .then(() => {
        setRefresh(true);
        setIsSuccessfull(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setTimeout(() => {
      if (!isOpen) {
        setIsSuccessfull(false);
      }
    }, 500);
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isForm={true}
      close={isSuccessfull ? true : false}
      classname="!py-4 !max-w-lg !w-full !bg-advance shadow-none border-gray border"
    >
      {isSuccessfull ? (
        <article className="py-5">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-dark text-[50px]">
            <div className="relative -right-1 -top-1">🎉</div>
          </div>
          <div className="text-center text-3xl">Token approved successfully</div>
        </article>
      ) : (
        <form onSubmit={updateTermsOfServices}>
          <div className="font-primary text-xl font-semibold">Edit terms of services</div>
          <textarea
            name=""
            id=""
            placeholder="Terms"
            value={terms}
            autoFocus
            required
            onChange={(e) => setTerms(e.target.value)}
            className="custom-scrollbar mb-5 mt-4 h-64 w-full rounded-md bg-background p-3 py-2 font-advance text-sm leading-6 tracking-wide outline-none duration-300 focus:bg-sm focus:shadow-lg focus:outline-none focus:ring-0"
          ></textarea>
          <footer className="ml-auto grid max-w-60 grid-cols-2 gap-3">
            <Buttons.error type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Buttons.error>
            <Buttons.primary>Submit</Buttons.primary>
          </footer>
        </form>
      )}
    </Modal>
  );
}
