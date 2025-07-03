import { Request, Response } from "express";

export const generateCode = async (req: Request, res: Response) => {
  try {
    const { prompt, preCode } = req.body;
    if (!prompt) {
        res.status(400).json({ message: "Prompt is required" });
    }

    const code = `// AI-generated animation code for: ${prompt}`;

      res.status(200).json({ success: true, code });
  } catch (error) {
    console.error(error);
      res.status(500).json({ message: "Something went wrong" });
  }
};
