import React, { FormEvent, useState } from "react";
import Modal from "../../components/ui/modal";
import { FormInput } from "../../components/ui/input";
import { changeEvent } from "../../lib/types";
import { Buttons } from "../../components/ui/buttons";
import { Icons } from "../../components/ui/icons";
import axios from "axios";
import { backend_api } from "../../lib/constants";
import { setStore } from "../../lib/utils/store";
import { useGlobalContext } from "../../lib/global-context";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setIsLogin, setIsSignup } = useGlobalContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    axios
      .post(backend_api + "/login", { ...form }, { withCredentials: true })
      .then((response) => {
        setStore("token", response.data.token);
        setForm({ email: "", password: "" });
        window.location.href = "/";
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
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
      <Buttons.primary>Sign in</Buttons.primary>
      <section className="flex items-center gap-3 text-lg font-semibold">
        <div className="bg-line h-px w-full" />
        OR
        <div className="bg-line h-px w-full rotate-180" />
      </section>
      <div className="text-center text-sm font-normal">
        <section className="mb-4 flex items-center justify-center gap-4">
          {[<Icons.facebook />, <Icons.google />, <Icons.telegram />].map((Icon, idx) => (
            <div key={idx} className="cursor-pointer rounded-full bg-muted p-4">
              {Icon}
            </div>
          ))}
        </section>{" "}
        Already have an account?{" "}
        <span onClick={() => setIsSignup(true)} className="cursor-pointer text-purple-500">
          Sign up
        </span>
      </div>
    </form>
  );
}
