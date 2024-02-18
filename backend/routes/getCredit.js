import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

import { GoogleGenerativeAI } from "@google/generative-ai";
import creditCardPrompt from '../prompts/creditCard.js';

const genAI = new GoogleGenerativeAI("AIzaSyCp4kRI9XDs4rDs6AQusexuPbHemYC5CPk");
const generationConfig = {
   temperature: 0.7
};

async function generateCreditDetails(BANK_NAME, CARD_TYPE, CREDIT_SCORE) {
   CARD_TYPE = CARD_TYPE.toLowerCase().replace(/card/g, '');
   // Update the search prompt with the bank's details and other required info
   const updatedSearchPrompt = creditCardPrompt
      .replaceAll('BANK_NAME', BANK_NAME)
      .replaceAll('CARD_TYPE',CARD_TYPE)
      .replaceAll('CREDIT_SCORE', CREDIT_SCORE)
   
      // Return a promise that resolves with the generated content
      const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});
      return model.generateContent(updatedSearchPrompt).then(result => {
         const response = result.response;
         return response.text(); 
      });
 }

router.post(`/${parsed.name}`, async (req, res) => {  
   const CARD_TYPE = req.body.choices[0];

   const CREDIT_SCORE = "650";
   
   Promise.all(req.body.banks.map(bank => generateCreditDetails(bank.name, CARD_TYPE, CREDIT_SCORE))).then(results => {
      const jsonObjectsArray = results.reduce((acc, jsonString) => {
         try {
             const jsonObject = JSON.parse(jsonString);
             acc.push(jsonObject);
         } catch (error) {
         }
         return acc;
     }, []);

     const filteredResults = jsonObjectsArray.filter(item => !item.error);
   //   console.log(filteredResults.length);
   //    filteredResults.forEach((result) => {
   //       // Assuming 'result.banks' is an array and we want the 'bankname' from each bank object in it
   //       result.cards.forEach((card) => {
   //         console.log(card.bank_name);
   //       });
   //     });       

      // Send the response
      res.send({cards : filteredResults});
   }).catch(error => {
   console.error('Error generating bank details:', error);
      res.status(500).send('An error occurred while processing your request.');
   });
});

export default router;