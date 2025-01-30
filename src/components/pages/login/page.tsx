import axios from "axios";
import React, { useState } from "react";
import { backend_api } from "../../../lib/constants";

export default function Login() {
  const [form, setForm] = useState({
    data: {},
    list: ["name", "email", "password"],
  });

  const register = () => {
    axios
      .post(backend_api + "/signup/", { ...form.data })
      .then((response) => {
        setForm({ ...form, data: {} });
      })
      .catch((err) => {});
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      {form.list.map((name) => (
        <div className="">
          <input
            type={name}
            value={form.data[name]}
            placeholder={name}
            onChange={(e) =>
              setForm({
                ...form,
                data: { ...form.data, [name]: e.target.value },
              })
            }
            className="mt-2 h-11 w-80 rounded-lg border border-gray bg-muted px-3 py-2 text-sm font-semibold text-primary focus:outline-none"
          />
        </div>
      ))}
      <button onClick={register} className="rounded-md bg-primary p-2 text-dark">
        submit
      </button>
    </div>
  );
}
