import React from "react";

export default function Agreement({ handleSubmit }) {
  return (
    <>
      <div className=" text-xl font-bold">Create an Account</div>
      <section className=" rounded-lg p-3 bg-advance flex flex-col gap-2">
        <div className=" text-lg font-medium">Terms and Conditions</div>
        <div className=" text-lg font-semibold">1. Webnet.com</div>
        <div className=" font-normal text-sm tracking-wider">
          1.1 Webnet.com is owned and operated by Medium Rare, N.V. (hereinafter
          "Stake", "We" or "Us"), a company with head office at Korporaalweg 10,
          Willemstad, Curaçao. Medium Rare N.V. is authorised to offer it’s
          services in accordance with the Certificate of Operation (Application
          no. OGL/2024/1451/0918) issued by the Curaçao Gaming Control Board.
          Some credit card payment processing are handled by its wholly owned
          subsidiary, Medium Rare Limited.
        </div>
      </section>
      <div className="flex items-center gap-2 text-sm font-normal">
        {" "}
        <input type="checkbox" name="" id="create-account" />{" "}
        <label htmlFor="create-account">
          I have read and agree to the terms and conditions
        </label>
      </div>
      <button
        onClick={handleSubmit}
        className="h-10 bg-primary flex items-center justify-center rounded-md font-semibold text-base text-dark mt-auto"
      >
        Confirm
      </button>
    </>
  );
}
