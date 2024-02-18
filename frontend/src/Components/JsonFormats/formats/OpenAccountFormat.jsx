import React from 'react';
import capitalizeWords from "../../../utils/capitalizeWords.js"

const OpenAccountFormat = ({ banks }) => {
  // console.log(banks)
  return (
    <div>
      {banks.map((bank, index) => (
        <div key={index} className="bank-information">
          <h2>{capitalizeWords(bank.bankname)}:</h2>
          <p><strong>Address:</strong> {bank.address}</p>

          <h3>Account Opening Requirements:</h3>
          <p><strong>Identification:</strong> {bank.account_opening_requirements.identification.join(', ')}</p>
          <p><strong>Proof of Address:</strong> {bank.account_opening_requirements.proof_of_address.join(', ')}</p>
          {bank.account_opening_requirements.additional_documents[0] !== "None" &&
            <p><strong>Additional Documents:</strong> {bank.account_opening_requirements.additional_documents.join(', ')}</p>
          }

          <h3>Types of Accounts:</h3>
          <p><strong>Checking Account:</strong> {bank.types_of_accounts.checking_account}</p>
          <p><strong>Savings Account:</strong> {bank.types_of_accounts.savings_account}</p>
          <p><strong>Money Market Account:</strong> {bank.types_of_accounts.money_market_account}</p>

          <h3>Considerations:</h3>
          <p><strong>Fees:</strong> {bank.considerations.fees}</p>
          <p><strong>Interest Rates:</strong> {bank.considerations.interest_rates}</p>
          <p><strong>Minimum Balance Requirements:</strong> {bank.considerations.minimum_balance_requirements}</p>
          <p><strong>Online and Mobile Banking Features:</strong> {bank.considerations.online_and_mobile_banking_features}</p>
          <p><strong>Customer Service:</strong> {bank.considerations.customer_service}</p>
          {bank.considerations.additional_benefits !== "None" &&
            <p><strong>Additional Benefits:</strong> {bank.considerations.additional_benefits}</p>
          }

          {bank.promotions !== "None" &&
            <p><strong>Promotions:</strong> {bank.promotions}</p>
          }
          <hr />
        </div>
      ))}
    </div>
  );
};

export default OpenAccountFormat;
