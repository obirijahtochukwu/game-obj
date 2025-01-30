import React, { Dispatch, FormEvent, useEffect, useState } from "react";
import Modal from "../../../ui/modal";
import { Icons } from "../../../ui/icons";
import { FormInput } from "../../../ui/input";
import { changeEvent } from "../../../../lib/types";
import { useDropzone } from "react-dropzone";
import { URL } from "url";
import { useGlobalContext } from "../../../../lib/global-context";
import axios from "axios";
import { backend_api } from "../../../../lib/constants";

export default function EditProfile() {
  const { setRefresh, user } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [form, setForm] = useState<any>({
    userId: user.info._id,
    name: "",
    email: "",
    date_of_birth: "",
    profileImage: "",
  });
  // console.log(user.info.profileImage);

  const handleChange = (e: changeEvent, key: string) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const imageSrc = form.profileImage || user.info?.profileImage || "./media/home/user.png";

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setForm({ ...form, profileImage: reader.result });
      reader.onerror = (error) => console.error("Error converting file to base64:", error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .put(backend_api + "/edit", {
        ...form,
      })
      .then(() => {
        setRefresh(true);
        setIsUpdated(true);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (!isOpen) {
      setIsUpdated(false);
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="ml-auto flex w-fit items-center gap-2 rounded-sm bg-gradient-custom px-3 py-1 font-advance"
      >
        <Icons.edit color="white" /> Edit profile
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} classname="!p-4" close>
        {isUpdated ? (
          <article className="py-5">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-dark text-[50px]">
              <div className="relative -right-1 -top-1">🎉</div>
            </div>
            <div className="text-center text-3xl">Profile updated successfully</div>
          </article>
        ) : (
          <form onSubmit={handleSubmit} className="mt-3 grid w-80 grid-cols-1 gap-4">
            <div className="">
              <div className="relative mx-auto h-fit w-fit">
                <img src={imageSrc} alt="" className="h-16 w-16 rounded-xl" />
                <input
                  required
                  type="file"
                  id="profile"
                  className="hidden"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="profile"
                  className="absolute -right-2 top-16 mt-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-gradient-custom"
                >
                  <Icons.edit className="w-3" />
                </label>
              </div>
              <div className="mt-2 text-center font-advance text-base font-semibold text-grey">Profile photo</div>
            </div>
            <FormInput.text
              required
              autoFocus
              value={form.name}
              onChange={(e) => handleChange(e, "name")}
              placeholder="Username"
            />
            <FormInput.email required value={form.email} onChange={(e) => handleChange(e, "email")} placeholder="Email" />

            <FormInput.date
              required
              value={form.date_of_birth}
              onChange={(e) => handleChange(e, "date_of_birth")}
              placeholder="Date of Birth"
            />
            <button
              type="submit"
              className="ml-auto mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-gradient-custom px-3 font-advance text-base font-semibold"
            >
              Edit profile
            </button>
          </form>
        )}
      </Modal>
    </>
  );
}
