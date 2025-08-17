import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useContent = () => {
  const [content, setContent] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const navigation = useNavigate();

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
      .catch(() => navigation("/signin"));
  }, []);
  return { isLoading, content, setContent };
};
