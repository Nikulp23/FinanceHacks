import React from 'react';
import OpenAccountFormat from './formats/OpenAccountFormat.jsx';
import ApplyFormat from './formats/ApplyFormat.jsx';
// import CreditFormat from './formats/CreditFormat.jsx';

const JsonFormat = ({ data, selectedOption }) => {
   // Here, you decide which component to render based on selectedOption
   console.log(data)
   if(data === undefined){
    return <div>Unable to access backend data.</div>
   }
   else if (data.error === "Unknown Request") {
    return <div>Error finding data to answer your request.</div>
   }
   if (selectedOption === 'openAccount' && data.banks !== undefined) {
     return <OpenAccountFormat banks={data.banks} />;
   } 
   else if (selectedOption === 'applyLoan') {
    // return <div>{data}</div>
    return <ApplyFormat loans={data.loans} />;
   }
   else if (selectedOption === 'selectCreditCard') {
    return <div>Select Credit Card</div>
   }
   else {
    return <div>{data}</div>
   }
 };
 
 export default JsonFormat;