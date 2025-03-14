import React, { FormEvent, useEffect, useState } from "react";
import Modal from "./modal";
import { FormInput } from "./input";
import { Icons } from "./icons";
import { useDiasbleMouse } from "../../lib/hooks/useDisableMouse";
import axios from "axios";
import { backend_api } from "../../lib/constants";
import { toast } from "react-toastify";
import { getImagePath } from "../../lib/utils";
import { useGlobalContext } from "../../lib/global-context";

export default function CreateAd({ IsCreateAd, setIsCreateAd }: { IsCreateAd: boolean; setIsCreateAd: React.Dispatch<boolean> }) {
  const { isMouseDisable, disableMouse, enableMouse } = useDiasbleMouse();
  const { setRefresh } = useGlobalContext();
  const [form, setForm] = useState<{ image?: any; link?: string; title?: string; description?: string }>({});

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    setForm({ ...form, image: file });
  };

  const createAd = (e: FormEvent) => {
    e.preventDefault();
    disableMouse();
    const formData = new FormData();
    formData.append("image", form.image);
    formData.append("link", form.link);
    formData.append("title", form.title);
    formData.append("description", form.description);
    console.log(form);

    axios
      .post(backend_api + "/create-ad", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      })
      .then((res) => {
        enableMouse();
        setIsCreateAd(false);
        setRefresh(true);
        toast.success("🎉 Ad successfully created!");
        setForm({ image: {}, title: "", description: "" });
      })
      .catch((err) => {
        console.log(err);
        enableMouse();
        toast.success("❌ Ad creation failed, please try again.");
      });
  };

  return (
    <Modal isForm isOpen={IsCreateAd} setIsOpen={setIsCreateAd} classname="!py-4 !bg-image">
      <form onSubmit={createAd} className="flex flex-col gap-4 font-advance">
        <div className="text-lg font-semibold">Create Ad </div>
        <label htmlFor="image_ad" className="">
          <div
            className={`bg rounded-mds flex h-11 w-full items-center gap-3 truncate bg-muted px-3 text-sm ${form.image?.name || "text-grey"} ${form.description && !form.image?.name && "border border-danger"}`}
          >
            <Icons.image_upload className="w-6 text-grey" />
            <div className="h-full border-l border-gray" />
            {form.image?.name || " Upload image"}
          </div>
          {form.description && !form.image?.name && <div className="text-xs italic text-error">please upload image</div>}
        </label>
        <input required type="file" id="image_ad" className="hidden" accept=".png, .jpeg, .jpg" onChange={handleFileChange} />

        <FormInput.text
          required
          placeholder="Link"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          classname="bg-muted"
        />
        <FormInput.text
          required
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          classname="bg-muted"
        />
        <FormInput.textarea
          required
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          classname="bg-muted"
        />
        <footer className="mt-8 flex items-center justify-end gap-3">
          <button type="button" onClick={() => setIsCreateAd(false)} className="h-10 px-5 text-base font-medium text-grey">
            Cancel
          </button>
          <button type="submit" className="flex h-10 items-center rounded-sm bg-gradient-custom px-5 text-base font-medium">
            {isMouseDisable ? (
              <div className="!ml-0 scale-50">
                <div className="spinner"></div>
              </div>
            ) : (
              "Done"
            )}
          </button>
        </footer>
      </form>
    </Modal>
  );
}
