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

   const BANK_NAME = "Chase Bank";
   const LOAN_TYPE = req.body.choices[0];
   const LOAN_AMOUNT = "20k";
   const CREDIT_SCORE = req.body.choices[1];

   const updatedSearchPrompt = loanInfoPrompt
      .replaceAll('BANK_NAME', BANK_NAME)
      .replaceAll('LOAN_TYPE',LOAN_TYPE)
      .replaceAll('LOAN_AMOUNT', LOAN_AMOUNT)
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