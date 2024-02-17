const loanInfoPrompt = `
Finance Problem:

For a given bank, find and output all loan information.

The bank will be given using BANK_NAME.

This person needs a LOAN_TYPE loan, intends to borrow an amount of LOAN_AMOUNT, and has a credit score of CREDIT_SCORE.

Please respond with plaintext only. Fill in this JSON as your response, and respond with only the filled-out JSON form below. Nothing else.

{
  "loans": [
    {
      "bank_name": "BANK_NAME",
      "loan_type": "LOAN_TYPE",
      "loan_amount_requested": "LOAN_AMOUNT",
      "applicant_credit_score": "CREDIT_SCORE",
      "interest_rate": "Interest rate for the loan",
      "loan_term": "Term of the loan (e.g., 15 years, 30 years)",
      "minimum_credit_score": "Minimum credit score required",
      "loan_amount_range": "Minimum and maximum loan amount offered",
      "fees": "Any associated fees (e.g., origination fee, application fee)",
      "special_features": "Any special features or offers (e.g., flexible payment options)",
      "application_requirements": "List of requirements for application (e.g., proof of income, employment verification)"
    }
  ]
}

If you cannot find the answer, return the below JSON instead. Remember, this should only be used when you have tried everything and cannot find the loan information. {
  "error": "Unknown Request"
}
`;

export default loanInfoPrompt;


export default loanInfoPrompt;