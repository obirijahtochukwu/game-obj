import axios from "axios";
import React, { useState } from "react";
import { backend_api } from "../../../lib/constants";
import { Buttons } from "../../ui/buttons";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const [form, setForm] = useState({
    data: {},
    list: ["name", "email", "password"],
  });
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();
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
      {/* <Buttons.primary onClick={()=>logout()}>log</Buttons.primary> */}
      <Buttons.primary
        onClick={() =>
          loginWithRedirect({
            authorizationParams: {
              connection: "google-oauth2",
            },
          })
        }
      >
        hjgthrz
      </Buttons.primary>
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
        submith
      </button>
    </div>
  );
}
