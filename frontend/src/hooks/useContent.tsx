import axios from "axios";
import { useEffect, useState } from "react";

export const useContent = () => {
  const [content, setContent] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URI}/content`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setIsloading(false);
        setContent(res.data.content);
      })
      .catch(() => {
        window.location.href = "https://brainly-landing-page.vercel.app/";
      });
  }, []);
  return { isLoading, content, setContent };
};
