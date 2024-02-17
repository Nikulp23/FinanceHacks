import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

import { GoogleGenerativeAI } from "@google/generative-ai";
import getBanksPrompt from '../prompts/getBanks.js';

const genAI = new GoogleGenerativeAI("AIzaSyCp4kRI9XDs4rDs6AQusexuPbHemYC5CPk");

router.post(`/${parsed.name}`, async (req, res) => {  
   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

   const USER_ADDRESS = req.body.USER_ADDRESS;

   const updatedPrompt = getBanksPrompt.replaceAll('USER_ADDRESS', USER_ADDRESS);

   const result = await model.generateContent(updatedPrompt);
   const response = result.response;
   const text = response.text();

   console.log(updatedPrompt);
   const jsonData = JSON.parse(text);
   
   res.json(jsonData);
});

export default router;


// {
//    "USER_ADDRESS": "60 Timberline Drive, Nanuet, NY"
//  }