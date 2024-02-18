import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

import { GoogleGenerativeAI } from "@google/generative-ai";
import openAccountDetailsPrompt from '../prompts/openAccount.js';
const genAI = new GoogleGenerativeAI("");
const generationConfig = {
   temperature: 0,
};

import data from "../prompts/sampleAccount.js";

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

      const jsonObjectsArray = results.reduce((acc, jsonString) => {
         try {
             const jsonObject = JSON.parse(jsonString);
             acc.push(jsonObject);
         } catch (error) {
         }
         return acc;
     }, []);

     const filteredResults = jsonObjectsArray.filter(item => !item.error);

      // filteredResults.forEach((result) => {
      //    // Assuming 'result.banks' is an array and we want the 'bankname' from each bank object in it
      //    result.banks.forEach((bank) => {
      //      console.log(bank.bankname);
      //    });
      //  });

      // Send the response
      res.send({banks : filteredResults});
   }).catch(error => {
      console.error('Error generating bank details:', error);
      res.send({banks : data});
      // res.status(500).send('An error occurred while processing your request.');
   });
});

export default router;


// {
//    "BANK_NAME" : "Bank of America",
//    "BANK_ADDRESS" : "242 W Nyack Rd, Nanuet, NY 10954",
//    "CITIZENSHIP_STATUS" : "NON US CITIZEN",
//    "CURRENT_AGE" : "20",
//    "WORKING_STATUS" : "college student"
// }