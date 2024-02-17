const getBanksPrompt = `
Finance Problem:

Find all of the banks nearby

Identify 2 banks that are the best

Find banks in or near: { USER_ADDRESS } that match that specialty 

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

export default getBanksPrompt;