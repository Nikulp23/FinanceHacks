const getBanksPrompt = `
Finance Problem:

FIND ALL the banks that are the NEAREST AND BEST near USER_ADDRESS

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

If you can not find the answer, return the below JSON instead. Remember, it is ok to return the above JSON with no banks, this should only be used when you have tried everything and cannot find a bank near you. {
  "error": "Unknown Request"
}
`;

export default getBanksPrompt;