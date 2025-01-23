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
        console.log(response);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <article className=" flex items-center justify-center h-screen font-advance">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 text-primary rounded-2xl !bg-background w-96 h-80 p-5 border-gray border"
      >
        <header className=" flex justify-between items-center">
          <div className=" text-2xl font-bold font-primary">Webet</div>
          <div
            onClick={() => setIsLogin(false)}
            className=" text-lg font-medium cursor-pointer"
          >
            Exit
          </div>
        </header>
        <FormInput.email
          required
          autoFocus
          value={form.email}
          onChange={(e: changeEvent) =>
            setForm({ ...form, email: e.target.value })
          }
          placeholder="Email"
        />
        <FormInput.password
          required
          value={form.password}
          onChange={(e: changeEvent) =>
            setForm({ ...form, password: e.target.value })
          }
          placeholder="Password"
        />
        <Buttons.primary classname="!mt-auto">Sign in</Buttons.primary>
      </form>
    </article>
  );
}
