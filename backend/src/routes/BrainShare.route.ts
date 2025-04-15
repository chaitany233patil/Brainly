import { Router } from "express";
import { BrainShare, getShareBrain } from "../controllers/brain.controller";
import { userAuth } from "../middlewares";

const router = Router();

router.post("/", userAuth, BrainShare);
router.get("/:sharelink", getShareBrain);

export default router;
