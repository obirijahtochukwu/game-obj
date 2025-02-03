import React from "react";
import Modal from "../components/ui/modal";
import { useGlobalContext } from "../lib/global-context";
import Signup from "./signup";
import Login from "./login";

export default function Authentication() {
  const { isLogin, isSignup, setIsLogin, setIsSignup } = useGlobalContext();

  // useEffect(() => {
  //   if (isSignup||isLogin) {
  //     setiope
  //   }

  //   return () => {
  //     second
  //   }
  // }, [third])

  return (
    <Modal
      isOpen={isLogin || isSignup}
      setIsOpen={() => {
        setIsLogin(false);
        setIsLogin(false);
      }}
      classname="!w-full max-w-md !min-h-96 !pt-3.5 !rounded-2xl !bg-image"
    >
      <>{isSignup ? <Signup /> : <Login />}</>
    </Modal>
  );
}
