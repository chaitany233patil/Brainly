import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const useContent = () => {
  const [username, setUsername] = useState("");
  const [content, setListContent] = useState([]);
  
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/content`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUsername(res.data.content[0].userId?.username);
        setListContent(res.data.content);
      });
  }, []);
  return { username, content };
};
