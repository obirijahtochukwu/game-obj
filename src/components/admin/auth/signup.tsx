import React, { FormEvent, useState } from "react";
import Modal from "../../../components/ui/modal";
import { FormInput } from "../../../components/ui/input";
import { changeEvent } from "../../../lib/types";
import { Buttons } from "../../../components/ui/buttons";
import { Icons } from "../../../components//ui/icons";
import axios from "axios";
import { backend_api } from "../../../lib/constants";
import { setStore } from "../../../lib/utils/store";
import { backgroundImage } from "../../../lib/utils";
import DarkThemeBackground from "./anime";
import { toast } from "react-toastify";

export default function Signup() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "admin" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    axios
      .post(backend_api + "/admin/signup", { ...form }, { withCredentials: true })
      .then((response) => {
        setStore("token", response.data.token);
        setForm({ name: "", email: "", password: "", role: "admin" });
        console.log(response);
        toast.error(response.data.message);
        // window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <article className="flex h-screen items-center justify-center font-advance">
      <DarkThemeBackground />
      <form
        onSubmit={handleSubmit}
        style={{ backgroundImage: backgroundImage }}
        className="z-10 flex h-80 w-96 flex-col gap-6 rounded-2xl !bg-background p-5 text-primary"
      >
        <header className="flex items-center justify-between">
          <div className="font-primary text-2xl font-bold">Webet</div>
          <div onClick={() => setIsLogin(false)} className="cursor-pointer text-lg font-medium">
            Exit
          </div>
        </header>
        <FormInput.text
          required
          autoFocus
          value={form.name}
          onChange={(e: changeEvent) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
        />
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
        <Buttons.primary classname="!mt-auto text-primary text-lg !py-4">Create account</Buttons.primary>
      </form>
    </article>
  );
}
