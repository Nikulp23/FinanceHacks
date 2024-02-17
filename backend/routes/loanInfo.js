import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

import { GoogleGenerativeAI } from "@google/generative-ai";
import loanInfoPrompt from '../prompts/loanInfo.js';

const genAI = new GoogleGenerativeAI("AIzaSyCp4kRI9XDs4rDs6AQusexuPbHemYC5CPk");

router.post(`/${parsed.name}`, async (req, res) => {  
   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

   const BANK_NAME = req.body.BANK_NAME;

   const updatedPrompt = loanInfoPrompt.replace('BANK_NAME', BANK_NAME);

   const result = await model.generateContent(updatedPrompt);
   const response = result.response;
   const text = response.text();

   const jsonData = JSON.parse(text);
   res.json(jsonData);
});

export default router;