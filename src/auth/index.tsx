import React from "react";
import Modal from "../components/ui/modal";
import { useGlobalContext } from "../lib/global-context";
import Signup from "./signup";
import Login from "./login";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { backend_api } from "../lib/constants";
import axios from "axios";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBNDccSxHoqe3jRxgJ87w5AchaHbsckQNc",
  authDomain: "webnet-6462a.firebaseapp.com",
  projectId: "webnet-6462a",
  storageBucket: "webnet-6462a.firebasestorage.app",
  messagingSenderId: "365125610541",
  appId: "1:365125610541:web:8a996ea6f07e51720cdca4",
  measurementId: "G-DX3S2EWE7E",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = async ({ setStore }) => {
  try {
    const { email, providerId } = (await signInWithPopup(auth, provider)).user;
    axios
      .post(backend_api + "/login", { email, password: providerId }, { withCredentials: true })
      .then((response) => {
        setStore("token", response.data.token);
        window.location.href = "/";
      })
      .catch((err) => {
        toast.error("User not found. Please check your credentials or sign up.");
      });
  } catch (error) {
    console.error(error);
  }
};

export const signUpWithGoogle = async ({ setStore, setIsSuccessfull }) => {
  try {
    const { email, displayName, providerId } = (await signInWithPopup(auth, provider)).user;
    console.log(email);

    axios
      .post(
        backend_api + "/signup",
        {
          name: displayName,
          email,
          password: providerId,
          date_of_birth: "",
          language: "English",
        },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data?.email) {
          setStore("token", res.data.token);
          setIsSuccessfull(true);
        } else {
          toast.error("User already exists");
        }
      })
      .catch((err) => {});
  } catch (error) {
    console.error(error);
  }
};

export default function Authentication() {
  const { isLogin, isSignup, setIsLogin, setIsSignup } = useGlobalContext();

  return (
    <Modal
      isForm
      isOpen={isLogin || isSignup}
      setIsOpen={() => {
        setIsLogin(false);
        setIsLogin(false);
      }}
      classname="md:!w-full md:max-w-md !min-h-96 !pt-3.5 !rounded-2xl !bg-image"
    >
      <>{isSignup ? <Signup /> : isLogin ? <Login /> : null}</>
    </Modal>
  );
}
