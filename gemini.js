const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCp4kRI9XDs4rDs6AQusexuPbHemYC5CPk"); // Your Google Generative AI API key here

const searchPrompt = `
Finance Problem:

Find all of the banks nearby

Identify 10 banks that are the best

Find banks in or near: { Troy , NY } that match that specialty 

Please do not respond with any symbols, only plaintext. Fill in this JSON (doctors is a list of doctors, an example doctor object is shown) as your response, and respond with only the filled out JSON form below. Nothing else. Try to fill as many doctors and as much info in the JSON as you can:

{
  "banks": [
         {
             "bankname": "<name>",
             "address": "<address>"
      }
   ]
}

If you can not find the answer, return the below JSON instead. Remember, it is ok to return the above JSON with no doctors, this should only be used when you have tried everything and cannot determine this to be a medical issue. {
  "error": "Unknown Request"
}
`;

async function run() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
    const result = await model.generateContent(searchPrompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();