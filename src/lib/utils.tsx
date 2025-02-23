import { backend_api } from "./constants";
import { getStore } from "./utils/store";

export const backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, .5)), url("./media/Background.png")`;

export const userExist = getStore("token");

export const getImagePath = (image: string) => `${backend_api}/${image.replace(/\\/g, "/")}`;

export const randomData = (length: number) => Array(length).fill("");
