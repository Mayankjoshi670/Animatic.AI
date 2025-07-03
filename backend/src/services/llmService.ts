import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv" ; 
dotenv.config() ; 
const GOOGLE_API_KEY  = process.env.GOOGLE_API_KEY ; 

const ai  = new GoogleGenAI({apiKey: GOOGLE_API_KEY}) ; 

export const animationCode = ()=>{
    return 
}