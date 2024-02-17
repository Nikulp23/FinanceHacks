import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

import { GoogleGenerativeAI } from "@google/generative-ai";
import openAccountDetailsPrompt from '../prompts/openAccount.js';
const genAI = new GoogleGenerativeAI("AIzaSyCp4kRI9XDs4rDs6AQusexuPbHemYC5CPk");

router.post(`/${parsed.name}`, async (req, res) => {

   const BANK_NAME = req.body.BANK_NAME;
   const BANK_ADDRESS = req.body.BANK_ADDRESS;
   const CITIZENSHIP_STATUS = req.body.CITIZENSHIP_STATUS;
   const CURRENT_AGE = req.body.CURRENT_AGE;
   const WORKING_STATUS = req.body.WORKING_STATUS;

   const updatedSearchPrompt = openAccountDetailsPrompt
      .replaceAll('BANK_NAME', BANK_NAME)
      .replaceAll('BANK_ADDRESS',BANK_ADDRESS)
      .replaceAll('CITIZENSHIP_STATUS', CITIZENSHIP_STATUS)
      .replaceAll('CURRENT_AGE', CURRENT_AGE)
      .replaceAll('WORKING_STATUS', WORKING_STATUS);

   const model = genAI.getGenerativeModel({ model: "gemini-pro"});
   const result = await model.generateContent(updatedSearchPrompt);
   const response = result.response;
   const text = response.text();
   const jsonData = JSON.parse(text);

   res.json(jsonData);
});

export default router;


// {
//    "BANK_NAME" : "Bank of America",
//    "BANK_ADDRESS" : "242 W Nyack Rd, Nanuet, NY 10954",
//    "CITIZENSHIP_STATUS" : "NON US CITIZEN",
//    "CURRENT_AGE" : "20",
//    "WORKING_STATUS" : "college student"
// }