import React from "react";
import { FormInput } from "../../components/ui/input";
import { Icons } from "../../components/ui/icons";
import { changeEvent } from "../../lib/types";
import { Buttons } from "../../components/ui/buttons";
import { useGlobalContext } from "../../lib/global-context";

export default function CreateAccount({ steps, setSteps, handleSubmit }) {
  const { setIsSignup } = useGlobalContext();

  const handleChange = (e: changeEvent, key: string) => {
    setSteps({ ...steps, form: { ...steps.form, [key]: e.target.value } });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <FormInput.text
        required
        autoFocus
        value={steps.form.name}
        onChange={(e) => handleChange(e, "name")}
        placeholder="Username"
      />
      <div className="grid grid-cols-2 gap-3">
        <FormInput.email required value={steps.form.email} onChange={(e) => handleChange(e, "email")} placeholder="Email" />
        <FormInput.password
          required
          value={steps.form.password}
          onChange={(e) => handleChange(e, "password")}
          placeholder="Password"
        />
      </div>
      <FormInput.date
        required
        value={steps.form.date_of_birth}
        onChange={(e) => handleChange(e, "date_of_birth")}
        placeholder="Date of Birth"
      />
      <Buttons.primary>Confirm</Buttons.primary>
    </form>
  );
}
