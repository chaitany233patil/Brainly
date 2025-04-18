import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Signup = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const usernameRef = useRef<HTMLInputElement>();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function signup() {
    try {
      if (usernameRef.current.value && passwordRef.current.value)
        await axios.post(`${BACKEND_URL}/signup`, {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        });
      alert("signup successfull");
      navigate("/signin");
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  return (
    <>
      <div className="h-screen w-screen absolute bg-gray-600 opacity-90"></div>
      <div className="absolute h-screen w-screen flex justify-center items-center ">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white p-4 rounded-2xl flex flex-col items-center"
        >
          <div className="font-medium text-xl mb-3">SignUp</div>
          <form className="flex flex-col items-center">
            <Input type="text" placeholder="Username" reference={usernameRef} />
            <Input
              type="password"
              placeholder="password"
              reference={passwordRef}
            />
            <p className="text-sm text-gray-500 m-2">
              already signup{" "}
              <a className="text-blue-500 underline" href={`/signin`}>
                Click here
              </a>
            </p>
            <Button
              varient="primary"
              size="md"
              text="signup"
              fullsize="w-[95%]"
              onClick={signup}
            />
          </form>
        </motion.div>
      </div>
    </>
  );
};
