import express from "express";
import { generateCode } from "../controllers/animationController";
import { downloadZip } from "../controllers/downloadZip ";
const router = express.Router();

router.post("/generate", generateCode);
router.post("/download-zip" , downloadZip ) ; 

export default router;
