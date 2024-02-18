import React from 'react';
import capitalizeWords from "../../../utils/capitalizeWords.js"

const ApplyFormat = ({ banks }) => {
  console.log(banks)
  return (
    <div>
      {banks.map((bank, index) => (
        <div key={index} className="bank-information">
          <h2>{capitalizeWords(bank.bankname)}:</h2>
          <p><strong>Address:</strong> {bank.address}</p>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default ApplyFormat;
