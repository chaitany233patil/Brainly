import axios from "axios";
import { useEffect, useState } from "react";

export const useContent = () => {
  const [content, setListContent] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URI}/content`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setListContent(res.data.content);
      });
  }, []);
  return { content };
};
