import { Router } from "express";
import {
  addContent,
  deleteContent,
  getContent,
} from "../controllers/content.controller";
import { userAuth } from "../middlewares";

const router = Router();

router.post("/", userAuth, addContent);
router.get("/", userAuth, getContent);
router.post("/:contentId", userAuth, deleteContent);

export default router;
