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

   const BANK_NAME = req.body.BANK_NAME;
   const BANK_ADDRESS = req.body.BANK_ADDRESS;
   const CITIZENSHIP_STATUS = req.body.CITIZENSHIP_STATUS;
   const CURRENT_AGE = req.body.CURRENT_AGE;
   const WORKING_STATUS = req.body.WORKING_STATUS;

   const updatedSearchPrompt = searchPrompt
      .replace('BANK_NAME', BANK_NAME)
      .replace('BANK_ADDRESS',BANK_ADDRESS)
      .replace('CITIZENSHIP_STATUS', CITIZENSHIP_STATUS)
      .replace('CURRENT_AGE', CURRENT_AGE)
      .replace('WORKING_STATUS', WORKING_STATUS);

   const model = genAI.getGenerativeModel({ model: "gemini-pro"});
   const result = await model.generateContent(updatedSearchPrompt);
   const response = result.response;
   const text = response.text();
   console.log(text);
   const jsonData = JSON.parse(text);
   
   res.json(jsonData);
});

export default router;