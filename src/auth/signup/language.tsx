import React from "react";
import { Icons } from "../../components/ui/icons";
import { Buttons } from "../../components/ui/buttons";

export default function Language({ handleSubmit }) {
  return (
    <>
      <section>
        <div className=" text-xl font-bold">Select your preferred language</div>
        <div className="mt-1 text-sm font-normal">
          Webet is available is several languages. Feel free to personalise your
          language across our site from the options below.
        </div>
      </section>
      <button
        disabled
        className=" flex items-center justify-between border border-gray h-11 px-4 rounded-lg text-sm font-semibold focus:border-2 focus:border-secondary duration-200 mb-10"
      >
        English <Icons.arrow color="#ffffff" className=" rotate-90 h-3" />
      </button>
      <Buttons.primary onClick={handleSubmit}>Confirm</Buttons.primary>
    </>
  );
}
