import React from "react";
import { FormInput } from "../../components/ui/input";
import { Icons } from "../../components/ui/icons";
import { changeEvent } from "../../lib/types";
import { Buttons } from "../../components/ui/buttons";

export default function CreateAccount({ steps, setSteps, handleSubmit }) {
  const handleChange = (e: changeEvent, key: string) => {
    setSteps({ ...steps, form: { ...steps.form, [key]: e.target.value } });
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-6">
      <FormInput.text
        required
        autoFocus
        value={steps.form.name}
        onChange={(e) => handleChange(e, "name")}
        placeholder="Username"
      />
      <div className=" grid grid-cols-2 gap-3">
        <FormInput.email
          required
          value={steps.form.email}
          onChange={(e) => handleChange(e, "email")}
          placeholder="Email"
        />
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
      <section className=" flex items-center gap-3 text-lg font-semibold">
        <div className=" w-full h-px bg-advance" />
        OR
        <div className=" w-full h-px bg-advance" />
      </section>
      <div className=" text-sm font-normal text-center">
        <section className=" flex justify-center items-center gap-4 mb-4">
          {[<Icons.facebook />, <Icons.google />, <Icons.telegram />].map(
            (Icon, idx) => (
              <div className="p-4 bg-muted rounded-full">{Icon}</div>
            )
          )}
        </section>{" "}
        Already have an account? Sign in
      </div>
    </form>
  );
}
