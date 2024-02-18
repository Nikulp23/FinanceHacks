import React from 'react';
import capitalizeWords from "../../../utils/capitalizeWords.js";

const CreditFormat = ({ cards }) => {
  console.log(cards);
  return (
    <div>
      {cards.map((card, index) => (
        <div key={index} className="credit-card-information">
          <h2>{capitalizeWords(card.bank_name)} - {capitalizeWords(card.card_name)}</h2>
          <p><strong>Card Type:</strong> {capitalizeWords(card.card_type)}</p>
          <p><strong>Annual Fee:</strong> {card.annual_fee}</p>
          <p><strong>Interest Rate (APR):</strong> {card.interest_rate}</p>
          <p><strong>Introductory Offers:</strong> {card.introductory_offers}</p>
          <p><strong>Rewards Program:</strong> {card.rewards_program}</p>
          <p><strong>Minimum Credit Score Required:</strong> {card.minimum_credit_score}</p>
          <p><strong>Other Fees:</strong> {card.fees}</p>
          <p><strong>Additional Benefits:</strong> {card.addtional_benefits}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CreditFormat;
