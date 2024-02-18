import React from 'react';
import capitalizeWords from "../../../utils/capitalizeWords.js"

const ApplyFormat = ({ banks }) => {

  // Check if banks is truthy and is an array before rendering
  if (!Array.isArray(banks)) {
    // Optionally, return a message or null if banks is not an array
    return <div>No bank information available.</div>;
  }
  
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
