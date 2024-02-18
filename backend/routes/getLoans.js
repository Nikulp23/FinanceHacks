import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

import { GoogleGenerativeAI } from "@google/generative-ai";
import loanInfoPrompt from '../prompts/loanInfo.js';

const genAI = new GoogleGenerativeAI("AIzaSyCp4kRI9XDs4rDs6AQusexuPbHemYC5CPk");

const generationConfig = {
   temperature: 0,
};

import data from "../prompts/sampleLoan.js";

async function generateLoanDetails(BANK_NAME, LOAN_TYPE, LOAN_AMOUNT, CREDIT_SCORE) {
   // Update the search prompt with the bank's details and other required info
   const updatedSearchPrompt = loanInfoPrompt
      .replaceAll('BANK_NAME', BANK_NAME)
      .replaceAll('LOAN_TYPE',LOAN_TYPE)
      .replaceAll('LOAN_AMOUNT', LOAN_AMOUNT)
      .replaceAll('CREDIT_SCORE', CREDIT_SCORE)
 
      // Return a promise that resolves with the generated content
      const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});
      return model.generateContent(updatedSearchPrompt).then(result => {
         const response = result.response;
         return response.text(); 
      });
 }

router.post(`/${parsed.name}`, async (req, res) => {  
   // const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });

   // const BANK_NAME = "Chase";
   const LOAN_TYPE = req.body.choices[0];
   const CREDIT_SCORE = req.body.choices[1];
   const LOAN_AMOUNT = req.body.choices[2];

   Promise.all(req.body.banks.map(bank => generateLoanDetails(bank.name, LOAN_TYPE, LOAN_AMOUNT, CREDIT_SCORE))).then(results => {
      // console.log(results)
      // console.log(results);
      // console.log(results)
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
      //    result.loans.forEach((bank) => {
      //      console.log(bank.bankname);
      //    });
      //  });

      // Send the response
      res.send({loans : filteredResults});
   }).catch(error => {
      // console.error('Error generating bank details:', error);
      // res.status(500).send('An error occurred while processing your request.');
      res.send({loans : data});
   });
});

export default router;