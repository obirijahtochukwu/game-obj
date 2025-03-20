import React, { FormEvent, useState } from "react";
import Modal from "../../components/ui/modal";
import { FormInput } from "../../components/ui/input";
import { changeEvent } from "../../lib/types";
import { Buttons } from "../../components/ui/buttons";
import { Icons } from "../../components/ui/icons";
import axios from "axios";
import { backend_api, disableMouse, enableMouse } from "../../lib/constants";
import { setStore } from "../../lib/utils/store";
import { useGlobalContext } from "../../lib/global-context";
import { toast } from "react-toastify";
import { loginWithGoogle } from "..";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setIsLogin, setIsSignup } = useGlobalContext();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    disableMouse();

    axios
      .post(backend_api + "/login", { ...form }, { withCredentials: true })
      .then((response) => {
        setStore("token", response.data.token);
        setForm({ email: "", password: "" });
        window.location.href = "/";
        enableMouse();
      })
      .catch((err) => {
        console.log(err);
        toast.error("User not found. Please check your credentials or sign up.");
        setIsLoading(false);
        enableMouse();
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-primary">
      <header className="flex items-center justify-between">
        <div className="text-2xl font-semibold">Webet</div>
        <div onClick={() => setIsLogin(false)} className="cursor-pointer text-lg font-medium">
          Exit
        </div>
      </header>
      <FormInput.email
        required
        autoFocus
        value={form.email}
        onChange={(e: changeEvent) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
      />
      <FormInput.password
        required
        value={form.password}
        onChange={(e: changeEvent) => setForm({ ...form, password: e.target.value })}
        placeholder="Password"
      />
      <Buttons.primary>
        {isLoading ? (
          <div className="scale-50">
            <div className="custom-loader"></div>
          </div>
        ) : (
          "Sign In"
        )}
      </Buttons.primary>
      <Buttons.google onClick={() => loginWithGoogle({ setStore })} />
      <div className="text-sm font-normal">
        You have not registered?
        <span onClick={() => setIsSignup(true)} className="ml-1 cursor-pointer text-purple-500">
          Sign up
        </span>
      </div>
    </form>
  );
}
