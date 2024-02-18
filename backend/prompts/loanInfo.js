const loanInfoPrompt = `
Finance Problem:

NAME OF BANK - BANK_NAME

TYPE OF LOAN - LOAN_TYPE

LOAN AMOUNT - LOAN_AMOUNT

CREDIT SCORE - CREDIT_SCORE

Based on this information, imagine a world where I am BANK_NAME and I want to set information about my different loans offered.

As an example, what would I make my interest rate for LOAN_TYPE?

Make sure the conditions given are met in the response.

Please respond with plaintext only. Fill in this JSON as your response, and respond with only the filled-out JSON form below. Nothing else.

{
  "loans": [
    {
      "bank_name": "BANK_NAME",
      "loan_type": "LOAN_TYPE",
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

If you cannot find the answer, return the below JSON instead. Remember, this should only be used when you have tried everything and cannot determine loan information. {
  "error": "Unknown Request"
  "reason": Give a reason why an answer could not be found
}
`;

export default loanInfoPrompt;