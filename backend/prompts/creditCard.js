const creditCardPrompt = `
   CREDIT CARD HELP:

   Bank name - BANK_NAME
   Card type - CARD TYPE

   Imagine a world where I am BANK_NAME with a CARD_TYPE credit card. I want to tell users about different things of the card.

   As an example, what would I set rewards_program as? What rewards does my card offer?

   Please respond with plaintext only. Fill in this JSON as your response, and respond with only the filled-out JSON form below. Fill out as many fields of the JSON, but not all fields need to be filled. Nothing else.

   {
      "cards": [
         {
            "bank_name": "BANK_NAME",
            "card_type": CARD_TYPE,
            "card_name": "Name given by the bank for the card",
            "credit_score": CREDIT_SCORE,
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

   If you cannot find the answer, return the below JSON instead. Remember, this should only be used when you have tried everything and cannot determine the credit card information. {
      "error": "Unknown Request",
      "reason": Give a reason why an answer could not be found
   }

`;

export default creditCardPrompt