import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

import { GoogleGenerativeAI } from "@google/generative-ai";
import creditCardPrompt from '../prompts/creditCard.js';

const genAI = new GoogleGenerativeAI("AIzaSyCp4kRI9XDs4rDs6AQusexuPbHemYC5CPk");

router.post(`/${parsed.name}`, async (req, res) => {  
   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

   const BANK_NAME = "Chase Bank";
   const CARD_TYPE = req.body.choices[0];
   const CREDIT_SCORE = req.body.choices[1];
   
   const updatedSearchPrompt = creditCardPrompt
      .replaceAll('BANK_NAME', BANK_NAME)
      .replaceAll('CARD_TYPE',CARD_TYPE)
      .replaceAll('CREDIT_SCORE', CREDIT_SCORE)

   const result = await model.generateContent(updatedSearchPrompt);
   const response = result.response;
   const text = response.text();

   console.log(text);
   // const jsonData = JSON.parse(text);
   // res.json(jsonData);

   res.send(updatedSearchPrompt);
});

export default router;