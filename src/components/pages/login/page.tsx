import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    data: {},
    list: ["name", "email", "password"],
  });

  const register = () => {
    axios
      .post("http://localhost:5000/signup/", { ...form.data })
      .then((response) => {
        setForm({ ...form, data: {} });
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
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
            className="h-11 w-80 bg-muted border border-gray rounded-lg font-semibold text-sm text-primary px-3 py-2 mt-2 focus:outline-none"
          />
        </div>
      ))}
      <button
        onClick={register}
        className="bg-primary text-dark p-2 rounded-md"
      >
        submit
      </button>
    </div>
  );
}
