import React from "react";
import { Buttons } from "../../components/ui/buttons";

export default function Agreement({ handleSubmit }) {
  return (
    <>
      <div className="text-xl font-bold">Terms and Conditions</div>
      <section className="flex flex-col gap-2 rounded-lg bg-advance p-3">
        <div className="text-lg font-semibold">1. Webnet.com</div>
        <div className="font-advance text-sm font-normal tracking-wider">
          1.1 Webnet.com is owned and operated by Medium Rare, N.V. (hereinafter "Stake", "We" or "Us"), a company with head
          office at Korporaalweg 10, Willemstad, Curaçao. Medium Rare N.V. is authorised to offer it’s services in accordance with
          the Certificate of Operation (Application no. OGL/2024/1451/0918) issued by the Curaçao Gaming Control Board. Some
          credit card payment processing are handled by its wholly owned subsidiary, Medium Rare Limited.
        </div>
      </section>
      <div className="flex w-fit items-center gap-2 text-sm font-normal">
        {" "}
        <input type="checkbox" name="" id="create-account" />{" "}
        <label className="!static !translate-y-0 cursor-pointer" htmlFor="create-account">
          I have read and agree to the terms and conditions
        </label>
      </div>
      <Buttons.primary onClick={handleSubmit} classname="mt-auto">
        Confirm
      </Buttons.primary>
    </>
  );
}
