import React, { useEffect, useState } from "react";
import { Buttons } from "../../components/ui/buttons";
import axios from "axios";
import { backend_api } from "../../lib/constants";

export default function Agreement({ handleSubmit, isLoading }) {
  const [terms, setTerms] = useState();

  useEffect(() => {
    axios
      .get(backend_api + "/terms_of_service")
      .then((res) => setTerms(res.data.terms_of_service))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="text-xl font-bold">Terms and Conditions</div>
      <section className="flex flex-col gap-2 rounded-lg bg-advance p-3 pr-0">
        <div className="text-lg font-semibold">1. Webnet.com</div>
        <div className="custom-scrollbar inline-block h-60 w-full overflow-y-auto whitespace-pre-wrap pr-3 font-advance text-sm font-normal tracking-wider">
          {terms}
        </div>
      </section>
      <div className="flex w-fit items-center gap-2 text-sm font-normal">
        <input type="checkbox" name="" id="create-account" />
        <label className="!static !translate-y-0 cursor-pointer" htmlFor="create-account">
          I have read and agree to the terms and conditions
        </label>
      </div>
      <Buttons.primary onClick={handleSubmit} classname="mt-auto">
        {isLoading ? (
          <div className="scale-50">
            <div className="custom-loader"></div>
          </div>
        ) : (
          "Create Account"
        )}
      </Buttons.primary>
    </>
  );
}
