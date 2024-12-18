import React, { FormEvent, useState } from "react";
import Modal from "../../components/ui/modal";
import { FormInput } from "../../components/ui/input";
import { changeEvent } from "../../lib/types";
import { Buttons } from "../../components/ui/buttons";
import { Icons } from "../../components/ui/icons";
import axios from "axios";
import { backend_api } from "../../lib/constants";
import { setStore } from "../../lib/utils/store";

export default function Login({ isLogin, setIsLogin }) {
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
    <Modal
      isOpen={isLogin}
      setIsOpen={setIsLogin}
      classname="!w-full max-w-md !min-h-96 !pt-3.5 !rounded-2xl !bg-dark"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 text-primary"
      >
        <header className=" flex justify-between items-center">
          <div className=" text-2xl font-semibold">Webet</div>
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
        <Buttons.primary>Sign in</Buttons.primary>
        <section className=" flex items-center gap-3 text-lg font-semibold">
          <div className=" w-full h-px bg-advance" />
          OR
          <div className=" w-full h-px bg-advance" />
        </section>
        <div className=" text-sm font-normal text-center">
          <section className=" flex justify-center items-center gap-4 mb-4">
            {[<Icons.facebook />, <Icons.google />, <Icons.telegram />].map(
              (Icon, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-muted rounded-full cursor-pointer"
                >
                  {Icon}
                </div>
              )
            )}
          </section>{" "}
          Already have an account? Sign in
        </div>
      </form>
    </Modal>
  );
}
