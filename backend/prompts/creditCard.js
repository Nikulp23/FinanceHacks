const creditCardPrompt = `
   CREDIT CARD HELP:

   Prompt: A customer with a good credit score (720+) is researching travel credit cards from reputable banks which is BANK_NAME.

   The type of card they want is a CARD_TYPE

   For the given bank (BANK_NAME), find and output all credit card information. Take the information off the website. You do not need to retrieve from the internal database.

   Can you recommend cards that match these criteria based on publicly available information from trusted financial websites? Please include details like annual fees, interest rates, and any limitations on benefits. If no suitable cards are found, explain the reasons.

   Please respond with plaintext only. Fill in this JSON as your response, and respond with only the filled-out JSON form below. Nothing else.

   {
      "cards": [
         {
            "bank_name": "BANK_NAME",
            "card_type": CARD_TYPE,
            "card_name": "Name given by the bank for the card",
            "annual_fee": "The annual fee for the card",
            "interest_rate": "Interest rate (APR) for the card",
            "introductory_offers": "Any promotional deals like 0% APR for the first year, bonus rewards points, or cashback offers.",
            "rewards_program": "Details about how rewards are earned (points, miles, cashback), redemption options, and any limitations or restrictions.",
            "minimum_credit_score": "Minimum credit score required.",
            "fees": "Other fees besides the annual fee, such as late payment fees, foreign transaction fees, balance transfer fees, etc.",
            "addtional_benefits": "Any perks or benefits associated with the card, like travel insurance, purchase protection, extended warranty, etc.",
         }
      ]
   }

   IF DETAILS FOR THIS TYPE OF CARD CANNOT BE FOUND, TRY FOR ANOTHER CARD FROM THE SAME BANK NAME = BANK_NAME

   If you cannot find the answer, return the below JSON instead. Remember, this should only be used when you have tried everything and cannot find the loan information. {
      "error": "Unknown Request",
      "reason": Give a reason why an answer could not be found
   }

`;

export default creditCardPrompt