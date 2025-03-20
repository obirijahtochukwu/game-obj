import React, { useEffect, useState } from "react";
import Modal from "../../components/ui/modal";
import { Icons } from "../../components/ui/icons";
import Language from "./language";
import CreateAccount from "./create-account";
import Agreement from "./agreement";
import axios from "axios";
import { backend_api, disableMouse, enableMouse } from "../../lib/constants";
import { setStore } from "../../lib/utils/store";
import { useGlobalContext } from "../../lib/global-context";
import { Buttons } from "../../components/ui/buttons";
import { toast } from "react-toastify";
import { profileImage } from "./mock-data";
import { signUpWithGoogle } from "..";

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

export default function Signup() {
  const { setIsSignup, setRefresh, setIsLogin } = useGlobalContext();
  const [steps, setSteps] = useState(initialSate);
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (steps.count == 1) {
      setSteps({ ...steps, count: 2 });
    } else if (steps.count == 2) {
      setSteps({ ...steps, count: 3 });
      setRefresh(true);
    } else {
      setIsLoading(true);
      disableMouse();
      axios
        .post(backend_api + "/signup", { ...steps.form }, { withCredentials: true })
        .then((res) => {
          if (res.data?.email) {
            setSteps(initialSate);
            setStore("token", res.data.token);
            setIsSuccessfull(true);
          } else {
            toast.error("User not found. Please check your credentials or sign up.");
          }
          enableMouse();
          setIsLoading(false);
        })
        .catch((err) => {
          setIsSuccessfull(false);
          enableMouse();
          setIsLoading(false);
        });
    }
  };

  const props = { steps, setSteps, handleSubmit, isLoading };

  return (
    <>
      {isSuccessfull ? (
        <article className="mt-12 flex h-full flex-col items-center justify-center text-primary">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-dark text-[50px]">
            <div className="relative -right-1 -top-1">🎉</div>
          </div>
          <div className="text-center text-3xl">You have successfully created your account</div>
          <Buttons.primary onClick={() => (window.location.href = "/")} classname="mt-24">
            Start Playing!
          </Buttons.primary>
        </article>
      ) : (
        <article className="flex flex-col gap-4 text-primary">
          <header className="flex items-center justify-between">
            <div className="text-2xl font-semibold">Webet</div>
            {/* <input type="file" name="" onChange={handleFileChange} id="" /> */}
            <div
              onClick={() => {
                setIsSignup(false);
                setIsLogin(false);
              }}
              className="cursor-pointer text-lg font-medium"
            >
              Exit
            </div>
          </header>
          <section className="grid grid-cols-3 gap-0.5">
            <div className="h-1 rounded-l-sm bg-gradient-custom" />
            <div className={`${steps.count > 1 ? "bg-gradient-custom" : "bg-gray"} h-1`} />
            <div className={`${steps.count == 3 ? "bg-pink" : "bg-gray"} h-1`} />
            {steps.count > 1 ? (
              <div
                onClick={() => setSteps({ ...steps, count: steps.count - 1 })}
                className="col-span-1 cursor-pointer text-sm font-normal"
              >
                Back
              </div>
            ) : (
              <div />
            )}
            <div className="col-span-2 text-right text-sm font-normal">Step {steps.count}/3</div>
          </section>
          {steps.count == 1 ? (
            <Language {...props} />
          ) : steps.count == 2 ? (
            <CreateAccount {...props} />
          ) : (
            <Agreement {...props} />
          )}
          {/* <div className="pt-1" /> */}
          <Buttons.google onClick={() => signUpWithGoogle({ setStore, setIsSuccessfull })} style={{ marginTop: "4px" }} />
          <div className="mt-3 text-sm font-normal">
            Already have an account?
            <span onClick={() => setIsSignup(false)} className="cursor-pointer text-purple-500">
              Sign in
            </span>
          </div>
        </article>
      )}
    </>
  );
}
