import React from 'react';
import capitalizeWords from "../../../utils/capitalizeWords.js";

const ApplyFormat = ({ loans }) => {

  if (!loans || loans.length === 0) {
    // Optionally, render a fallback UI or return null/empty div if there are no loans
    return <div></div>;
  }
  
  return (
    <div>
      {loans?.map((loanRaw, index) => (
        <div key={index} className="loan-information">
          {
            (() => {
              const loan = loanRaw?.loans[0]
              return (
                <>
                  <h2>{loan?.bankname?.toString()} Loan Details:</h2>
                  <p><strong>Type of Loan:</strong> {capitalizeWords(loan?.loan_type)}</p>
                  <p><strong>Loan Amount Requested:</strong> ${loan?.loan_amount_requested}</p>
                  <p><strong>Applicant Credit Score:</strong> {loan?.applicant_credit_score}</p>
                  <p><strong>Interest Rate:</strong> {loan?.interest_rate}</p>
                  <p><strong>Loan Term:</strong> {loan?.loan_term}</p>
                  <p><strong>Minimum Credit Score Required:</strong> {loan?.minimum_credit_score}</p>
                  <p><strong>Loan Amount Range:</strong> {loan?.loan_amount_range}</p>
                  <p><strong>Fees:</strong> {loan?.fees}</p>
                  <p><strong>Special Features:</strong> {loan?.special_features}</p>
                  <p><strong>Application Requirements:</strong> {loan?.application_requirements}</p>
                  <hr />
                </>
              )
                
            })()
          
          }
          
        </div>
      ))}
    </div>
  );
};

export default ApplyFormat;
