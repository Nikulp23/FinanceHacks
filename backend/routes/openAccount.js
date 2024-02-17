import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

import { GoogleGenerativeAI } from "@google/generative-ai";
import openAccountDetailsPrompt from '../prompts/openAccount.js';
const genAI = new GoogleGenerativeAI("AIzaSyCp4kRI9XDs4rDs6AQusexuPbHemYC5CPk");

router.get(`/${parsed.name}`, async (req, res) => {

   const model = genAI.getGenerativeModel({ model: "gemini-pro"});
   const result = await model.generateContent("what is your name");
   const response = await result.response;
   const text = response.text();
   console.log(text);

   // const updatedSearchPrompt = searchPrompt
   //    .replace('BANK_NAME', BANK_NAME)
   //    .replace('BANK_ADDRESS',BANK_ADDRESS)
   //    .replace('CITIZENSHIP_STATUS', CITIZENSHIP_STATUS)
   //    .replace('CURRENT_AGE', CURRENT_AGE)
   //    .replace('WORKING_STATUS', WORKING_STATUS);

   res.json({ canConnect: true });
});

export default router;