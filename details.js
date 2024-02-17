const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCp4kRI9XDs4rDs6AQusexuPbHemYC5CPk");

const searchPrompt = `
FINANCIAL HELP FOR OPENING A BANK ACCOUNT

BANK : BANK_NAME
ADDRESS : BANK_ADDRESS

The person's citizenship status is CITIZENSHIP_STATUS, CURRENT_AGE years old, and is WORKING_STATUS.

Please respond with plaintext only. Fill in this JSON template with information about bank account types that would be helpful for opening a bank account, and respond with only the filled-out JSON form below. Nothing else. 

{
  "banks": [
    {
      "bankname": "<Bank Name Here>",
      "address": "<Bank Address Here>",
      "account_opening_requirements": {
        "identification": [
          "List of documents required to open an account, such as a state photo ID (e.g., passport, driver's license, social security)"
        ],
        "proof_of_address": [
          "List of documents accepted as proof of address"
        ],
        "additional_documents": [
          "None if nothing else is required, otherwise list additional documents"
        ]
      },
      "types_of_accounts": {
        "checking_account": "Yes if available, otherwise specify",
        "savings_account": "Yes if available, otherwise specify",
        "money_market_account": "Yes if available and combines features of both checking and savings accounts, typically offering higher interest rates."
      },
      "considerations": {
        "fees": "Details about any applicable fees",
        "interest_rates": "Rates offered on savings accounts and certificates of deposit",
        "minimum_balance_requirements": "Minimum amounts required to open and maintain accounts without incurring fees",
        "online_and_mobile_banking_features": "Availability and features of online and mobile banking platforms",
        "customer_service": "Availability and quality of customer support channels (e.g., phone, email, in-person)",
        "additional_benefits": "Rewards programs, bonus offers for opening accounts, etc."
      },
      "promotions": "Details of any special promotions currently available."
    }
  ]
}

If you cannot find the answer, return the below JSON. This should only be used when you have tried everything and cannot determine this to be a finance-related issue. {
  "error": "Unknown Request"
}
`;

async function run(BANK_NAME, BANK_ADDRESS, CITIZENSHIP_STATUS,CURRENT_AGE,WORKING_STATUS) {

    const model = genAI.getGenerativeModel({ model: "gemini-pro"});


    // Assuming CITIZENSHIP_STATUS, CURRENT_AGE, and WORKING_STATUS are defined elsewhere in your code
    const updatedSearchPrompt = searchPrompt
      .replace('BANK_NAME', BANK_NAME)
      .replace('BANK_ADDRESS',BANK_ADDRESS)
      .replace('CITIZENSHIP_STATUS', CITIZENSHIP_STATUS)
      .replace('CURRENT_AGE', CURRENT_AGE)
      .replace('WORKING_STATUS', WORKING_STATUS);

    const result = await model.generateContent(updatedSearchPrompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run("Chase Bank", "174 Congress St. Troy, NY 12180", "US CITIZEN","20","COLLEGE STUDENT");