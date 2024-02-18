import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

import { GoogleGenerativeAI } from "@google/generative-ai";
import openAccountDetailsPrompt from '../prompts/openAccount.js';
const genAI = new GoogleGenerativeAI("AIzaSyCp4kRI9XDs4rDs6AQusexuPbHemYC5CPk");
const generationConfig = {
   temperature: 0,
};

router.post(`/${parsed.name}`, async (req, res) => {
   
   const BANK_NAME = "CHASE BANK";
   const BANK_ADDRESS = "NANUET, NY, 10954";

   const CITIZENSHIP_STATUS = req.body.choices[0];
   const CURRENT_AGE = req.body.choices[1];

   const WORKING_STATUS = "COLLEGE STUDENT";

   const updatedSearchPrompt = openAccountDetailsPrompt
      .replaceAll('BANK_NAME', BANK_NAME)
      .replaceAll('BANK_ADDRESS',BANK_ADDRESS)
      .replaceAll('CITIZENSHIP_STATUS', CITIZENSHIP_STATUS)
      .replaceAll('CURRENT_AGE', CURRENT_AGE)
      .replaceAll('WORKING_STATUS', WORKING_STATUS);

   const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});
   const result = await model.generateContent(updatedSearchPrompt);
   const response = result.response;
   const text = response.text();
   // console.log(text);

   res.send(text);
});

export default router;


// {
//    "BANK_NAME" : "Bank of America",
//    "BANK_ADDRESS" : "242 W Nyack Rd, Nanuet, NY 10954",
//    "CITIZENSHIP_STATUS" : "NON US CITIZEN",
//    "CURRENT_AGE" : "20",
//    "WORKING_STATUS" : "college student"
// }