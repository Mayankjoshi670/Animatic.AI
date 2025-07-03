import express from "express";
import { generateCode } from "../controllers/animationController";

const router = express.Router();

router.post("/generate", generateCode);

export default router;
