import React, { FormEvent, useState } from "react";
import Modal from "../../../components/ui/modal";
import { FormInput } from "../../../components/ui/input";
import { changeEvent } from "../../../lib/types";
import { Buttons } from "../../../components/ui/buttons";
import { Icons } from "../../../components//ui/icons";
import axios from "axios";
import { backend_api } from "../../../lib/constants";
import { setStore } from "../../../lib/utils/store";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    axios
      .post(backend_api + "/login", { ...form }, { withCredentials: true })
      .then((response) => {
        setStore("token", response.data.token);
        setForm({ email: "", password: "" });
        window.location.href = "/";
      })
      .catch((err) => {});
  };

  return (
    <article className="flex h-screen items-center justify-center font-advance">
      <form
        onSubmit={handleSubmit}
        className="flex h-80 w-96 flex-col gap-6 rounded-2xl border border-gray !bg-background p-5 text-primary"
      >
        <header className="flex items-center justify-between">
          <div className="font-primary text-2xl font-bold">Webet</div>
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
        <Buttons.primary classname="!mt-auto">Sign in</Buttons.primary>
      </form>
    </article>
  );
}
