const loanInfoPrompt = `
Finance Problem:

For a given bank, find and output all loan information

The bank will be given using { BANK_NAME }

Please do not respond with any symbols, only plaintext. Fill in this JSON as your response, and respond with only the filled out JSON form below. Nothing else. Try to fill as many doctors and as much info in the JSON as you can:


If you can not find the answer, return the below JSON instead. Remember, it is ok to return the above JSON with no doctors, this should only be used when you have tried everything and cannot determine this to be a medical issue. {
  "error": "Unknown Request"
}
`;