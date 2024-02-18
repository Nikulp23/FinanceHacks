import React from 'react';
import OpenAccountFormat from './formats/OpenAccountFormat.jsx';
import ApplyFormat from './formats/ApplyFormat.jsx';
import CreditFormat from './formats/CreditFormat.jsx';

const JsonFormat = ({ data, selectedOption }) => {
   // Here, you decide which component to render based on selectedOption
   console.log(data)

   if(data === undefined){
    return <div>{data.reason !== undefined ? data.reason !== undefined : "Unable to access backend data."}</div>
   }
   else if (data.error !== undefined) {
    const message = data.reason !== undefined ? data.reason : "Unable to access backend data.";
    return <div>{message}</div>;   
   }
   else if (selectedOption === 'openAccount') {
     return <OpenAccountFormat banks={data.banks} />;
   } 
   else if (selectedOption === 'applyLoan') {
    return <ApplyFormat loans={data.loans} />;
   }
   else if (selectedOption === 'selectCreditCard') {
    return <CreditFormat cards={data.cards} />;
   }
   else {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
   }
 };
 
 export default JsonFormat;