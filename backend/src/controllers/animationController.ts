import { Request, Response } from "express";
import {animationCode} from "../services/llmService"
export const generateCode = async (req: Request, res: Response) => {
  try {
    const { prompt, preCode } = req.body;
    if (!prompt) {
        res.status(400).json({ message: "Prompt is required" });
    }

    const code = await animationCode(prompt)  ; 
    console.log("now parsing and generating file")
      res.status(200).json({ success: true, code });
  } catch (error) {
    console.error(error);
      res.status(500).json({ message: "Something went wrong" });
  }
};
