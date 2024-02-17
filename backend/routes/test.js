import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCp4kRI9XDs4rDs6AQusexuPbHemYC5CPk");

const searchPrompt = `
Finance Help:

I have given you a bank name and it's address.

The person is CITZENSHIP_STATUS, and CURRENT_AGE years old and currently WORKING_STATUS

Please do not respond with any symbols, only plaintext. Fill in this JSON (doctors is a list of doctors, an example doctor object is shown) as your response, and respond with only the filled out JSON form below. Nothing else. Try to fill as many doctors and as much info in the JSON as you can:

GIVE ME TYPES OF ACCOUNT THAT WOULD BE HELPFUL 

{
  "banks": [
    {
      "bankname": "<Bank Name Here>",
      "address": "<Bank Address Here>",
      "phone_number": "<Bank Phone Number Here>",
      "account_opening_requirements": {
        "identification": [
          < documents required to open an account such as state photo ID (e.g., passport, driver's license, social security) >
        ],
        "proof_of_address": [
          < address proof documents >
        ],
        "additional_documents": [
          < return none if there are nothing else required, other fill it >
        ]
      },
      "types_of_accounts": {
        "checking_account": < yes if available >,
        "savings_account": < yes if available >,
        "money_market_account": "Combines features of both checking and savings accounts, typically offering higher interest rates."
      },
      "considerations": {
        "fees": < give details about what the fees are >,
        "interest_rates": < Rates offered on savings accounts and certificates of deposit >,
        "minimum_balance_requirements": < Minimum amounts required to open and maintain accounts without incurring fees > ",
        "online_and_mobile_banking_features": < Availability and features of online and mobile banking platforms >,
        "customer_service": < Availability and quality of customer support channels (e.g., phone, email, in-person) >,
        "additional_benefits": < Rewards programs, bonus offers for opening accounts, etc >
      },
      "promotions": < Details of any special promotions currently available.>
    }
  ]
}

If you can not find the answer, return the below JSON instead. Remember, it is ok to return the above JSON with no doctors, this should only be used when you have tried everything and cannot determine this to be a medical issue. {
  "error": "Unknown Request"
}
`;

router.get(`/${parsed.name}`, async (req, res) => {  
   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

   const result = await model.generateContent(searchPrompt);
   const response = await result.response;
   const text = response.text();
   console.log(text);



   
   res.json({ canConnect: true });
});

export default router;