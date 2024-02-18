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

async function generateBankDetails(bank, CITIZENSHIP_STATUS, CURRENT_AGE, WORKING_STATUS) {
   const BANK_NAME = bank.name;
   const BANK_ADDRESS = bank.address;
 
   // Update the search prompt with the bank's details and other required info
   const updatedSearchPrompt = openAccountDetailsPrompt
      .replaceAll('BANK_NAME', BANK_NAME)
      .replaceAll('BANK_ADDRESS', BANK_ADDRESS)
      .replaceAll('CITIZENSHIP_STATUS', CITIZENSHIP_STATUS)
      .replaceAll('CURRENT_AGE', CURRENT_AGE)
      .replaceAll('WORKING_STATUS', WORKING_STATUS);
 
   // Return a promise that resolves with the generated content
   const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});
   return model.generateContent(updatedSearchPrompt).then(result => {
     const response = result.response;
     return response.text(); 
   });
 }

router.post(`/${parsed.name}`, async (req, res) => {
   const CITIZENSHIP_STATUS = req.body.choices[0];
   const CURRENT_AGE = req.body.choices[1];
   const WORKING_STATUS = "COLLEGE STUDENT";

   Promise.all(req.body.banks.map(bank => generateBankDetails(bank, CITIZENSHIP_STATUS, CURRENT_AGE, WORKING_STATUS))).then(results => {
      console.log(results)
      // Construct the final response object
      const responseObj = { banks: {} };
      req.body.banks.forEach((bank, index) => {
         responseObj.banks[`bank${index + 1}`] = { name: bank.name, details: results[index] };
      });
      
      // Send the response
      res.send(responseObj);
   }).catch(error => {
   console.error('Error generating bank details:', error);
      res.status(500).send('An error occurred while processing your request.');
   });
   // const CITIZENSHIP_STATUS = req.body.choices[0];
   // const CURRENT_AGE = req.body.choices[1];

   // const WORKING_STATUS = "COLLEGE STUDENT";

   // req.body.banks.forEach(bank => {
   //    const BANK_NAME = bank.name;
   //    const BANK_ADDRESS = bank.address;

   //    const updatedSearchPrompt = openAccountDetailsPrompt
   //       .replaceAll('BANK_NAME', BANK_NAME)
   //       .replaceAll('BANK_ADDRESS',BANK_ADDRESS)
   //       .replaceAll('CITIZENSHIP_STATUS', CITIZENSHIP_STATUS)
   //       .replaceAll('CURRENT_AGE', CURRENT_AGE)
   //       .replaceAll('WORKING_STATUS', WORKING_STATUS);

   //    const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});
   //    const result = await model.generateContent(updatedSearchPrompt);
   //    const response = result.response;
   //    const text = response.text();
   // });
   // // const BANK_NAME = "CHASE BANK";
   // // const BANK_ADDRESS = "NANUET, NY, 10954";

   // // const CITIZENSHIP_STATUS = req.body.choices[0];
   // // const CURRENT_AGE = req.body.choices[1];

   // // const WORKING_STATUS = "COLLEGE STUDENT";

   // // const updatedSearchPrompt = openAccountDetailsPrompt
   // //    .replaceAll('BANK_NAME', BANK_NAME)
   // //    .replaceAll('BANK_ADDRESS',BANK_ADDRESS)
   // //    .replaceAll('CITIZENSHIP_STATUS', CITIZENSHIP_STATUS)
   // //    .replaceAll('CURRENT_AGE', CURRENT_AGE)
   // //    .replaceAll('WORKING_STATUS', WORKING_STATUS);

   // const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});
   // const result = await model.generateContent(updatedSearchPrompt);
   // const response = result.response;
   // const text = response.text();
   // // console.log(text);

   // res.send(text);
});

export default router;


// {
//    "BANK_NAME" : "Bank of America",
//    "BANK_ADDRESS" : "242 W Nyack Rd, Nanuet, NY 10954",
//    "CITIZENSHIP_STATUS" : "NON US CITIZEN",
//    "CURRENT_AGE" : "20",
//    "WORKING_STATUS" : "college student"
// }