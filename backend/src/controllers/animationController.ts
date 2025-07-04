import { Request, Response } from "express";
import {animationCode} from "../services/llmService"
import parseAnimationOutput from "../services/parsr"
export const generateCode = async (req: Request, res: Response) => {
  try {
    const { prompt, preCode } = req.body;
    if (!prompt) {
        res.status(400).json({ message: "Prompt is required" });
    }

    const llmOutput = await animationCode(prompt)  ; 
    console.log("now parsing and generating file")
    //  send this code to parser which is in parser.ts 

try {
  const { html, js, manifest } = parseAnimationOutput(llmOutput);
  
  // Save to files (Node.js example)
  const fs = require('fs');
  fs.writeFileSync('index.html', html);
  fs.writeFileSync('sketch.js', js);
  if (manifest) {
    fs.writeFileSync('manifest.json', manifest);
  }
  
  console.log('Files saved successfully!');
} catch (error) {
  console.error('Error:', (error as Error ).message  );
}
    
      res.status(200).json({ success: true, llmOutput });
  } catch (error) {
    console.error(error);
      res.status(500).json({ message: "Something went wrong" });
  }
};
