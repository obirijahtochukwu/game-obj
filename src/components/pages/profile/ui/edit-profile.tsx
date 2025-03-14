import React, { Dispatch, FormEvent, useEffect, useState } from "react";
import Modal from "../../../ui/modal";
import { Icons } from "../../../ui/icons";
import { FormInput } from "../../../ui/input";
import { changeEvent } from "../../../../lib/types";
import { useDropzone } from "react-dropzone";
// import { URL } from "url";
import { useGlobalContext } from "../../../../lib/global-context";
import axios from "axios";
import { backend_api } from "../../../../lib/constants";
import { profileImage } from "./../../../../auth/signup/mock-data";
import { getImagePath } from "../../../../lib/utils";
import { useDiasbleMouse } from "../../../../lib/hooks/useDisableMouse";
import { toast } from "react-toastify";

const initailState = {
  name: "",
  email: "",
  date_of_birth: "",
  profileImage: "",
};

export default function EditProfile() {
  const { setRefresh, user } = useGlobalContext();
  const { isMouseDisable, disableMouse, enableMouse } = useDiasbleMouse();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<any>({ ...initailState, name: user.info.name, email: user.info.email });

  const handleChange = (e: changeEvent, key: string) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const imageSrc = form.profileImage ? URL.createObjectURL(form.profileImage) : user.info?.profileImage;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    disableMouse();
    const image = form.profileImage || user.info?.profileImage;
    const formData = new FormData();
    formData.append("profileImage", image);
    formData.append("userId", user.info._id);
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("date_of_birth", form.date_of_birth);

    axios
      .put(backend_api + "/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setRefresh(true);
        toast.success("🎉 Profile updated successfully");
        setIsOpen(false);
        enableMouse();
      })
      .catch((err) => {
        enableMouse();
      });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="ml-auto flex w-fit items-center gap-2 rounded-sm bg-gradient-custom px-3 py-1 font-advance"
      >
        <Icons.edit color="white" /> Edit profile
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} classname="!p-4" close>
        <form onSubmit={handleSubmit} className="mt-3 grid w-full grid-cols-1 gap-4">
          <div className="">
            <div className="relative mx-auto h-fit w-fit">
              <img src={imageSrc} alt="" className="h-16 w-16 rounded-xl" />
              <input
                // required
                type="file"
                id="profile"
                className="hidden"
                accept=".png, .jpeg, .jpg"
                onChange={(e: any) => setForm({ ...form, profileImage: e.target.files[0] })}
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
          <FormInput.text required autoFocus value={form.name} onChange={(e) => handleChange(e, "name")} placeholder="Username" />
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
            {isMouseDisable ? (
              <div className="scale-50">
                <div className="custom-loader"></div>
              </div>
            ) : (
              "Edit profile"
            )}
          </button>
        </form>
      </Modal>
    </>
  );
}
