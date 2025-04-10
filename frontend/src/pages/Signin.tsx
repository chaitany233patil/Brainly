import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const usernameRef = useRef<HTMLInputElement>();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function signin() {
    try {
      const response = await axios.post(`${BACKEND_URL}/signin`, {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      if (!response.data.token) {
        return alert(response.data.message);
      }
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="h-screen w-screen absolute bg-gray-600 opacity-90"></div>
      <div className="absolute h-screen w-screen flex justify-center items-center ">
        <div className="bg-white p-4 rounded-2xl flex flex-col items-center">
          <div className="font-medium text-xl mb-3">SiginIn</div>
          <Input type="text" placeholder="Username" reference={usernameRef} />
          <Input
            type="password"
            placeholder="password"
            reference={passwordRef}
          />
          <Button
            varient="primary"
            size="md"
            text="SiginIn"
            fullsize="w-[95%]"
            onClick={signin}
          />
        </div>
      </div>
    </>
  );
};
