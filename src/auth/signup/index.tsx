import React, { useState } from "react";
import Modal from "../../components/ui/modal";
import { Icons } from "../../components/ui/icons";
import Language from "./language";
import CreateAccount from "./create-account";
import Agreement from "./agreement";
import axios from "axios";
import { backend_api } from "../../lib/constants";
import { setStore } from "../../lib/utils/store";

const initialSate = {
  count: 1,
  form: {
    name: "",
    email: "",
    password: "",
    date_of_birth: "",
    language: "English",
  },
};

export default function Signup({ isSignup, setIsSignup }) {
  const [steps, setSteps] = useState(initialSate);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (steps.count == 1) {
      setSteps({ ...steps, count: 2 });
    } else if (steps.count == 2) {
      setSteps({ ...steps, count: 3 });
    } else {
      axios
        .post(
          backend_api + "/signup",
          { ...steps.form },
          { withCredentials: true }
        )
        .then((response) => {
          setSteps(initialSate);
          console.log(response);
          setStore("token", response.data.token);

          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const props = { steps, setSteps, handleSubmit };

  return (
    <Modal
      isOpen={isSignup}
      setIsOpen={setIsSignup}
      classname="!w-full max-w-md !min-h-96 !pt-3.5 !rounded-2xl !bg-dark"
    >
      <article className="flex flex-col gap-4 text-primary">
        <header className=" flex justify-between items-center">
          <div className=" text-2xl font-semibold">Webet</div>
          <div
            onClick={() => setIsSignup(false)}
            className=" text-lg font-medium cursor-pointer"
          >
            Exit
          </div>
        </header>
        <section className=" grid grid-cols-3 gap-0.5">
          <div className=" h-1 bg-gradient-custom rounded-l-sm" />
          <div
            className={`${
              steps.count > 1 ? " bg-gradient-custom" : "bg-gray"
            } h-1`}
          />
          <div
            className={`${
              steps.count == 3 ? " bg-gradient-custom" : "bg-gray"
            } h-1`}
          />
          {steps.count > 1 ? (
            <div
              onClick={() => setSteps({ ...steps, count: steps.count - 1 })}
              className="col-span-1 text-sm font-normal cursor-pointer"
            >
              Back
            </div>
          ) : (
            <div />
          )}
          <div className=" text-right col-span-2 text-sm font-normal">
            Step {steps.count}/3
          </div>
        </section>
        {steps.count == 1 ? (
          <Language {...props} />
        ) : steps.count == 2 ? (
          <CreateAccount {...props} />
        ) : (
          <Agreement {...props} />
        )}
      </article>
    </Modal>
  );
}
