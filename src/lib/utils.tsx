import { getStore } from "./utils/store";

export const backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, .5)), url("./media/Background.png")`;

export const userExist = getStore("token");
