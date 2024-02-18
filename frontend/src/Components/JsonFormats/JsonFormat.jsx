import React from 'react';
import OpenAccountFormat from './formats/OpenAccountFormat.jsx';
// import ApplyFormat from './formats/ApplyFormat.jsx';

const JsonFormat = ({ data, selectedOption }) => {
   // Here, you decide which component to render based on selectedOption
   console.log(data)
   if(data == undefined || data.error == "Unknown Request"){
    return <div>Unable to access backend data. Please try again.</div>
   }
   else if (data.error == "Unknown Request") {
    return <div>Error processing data.</div>
   }
   if (selectedOption === 'openAccount' && data.banks != undefined) {
     return <OpenAccountFormat banks={data.banks} />;
   } 
   else if (selectedOption === 'applyLoan') {
    return <div>{data}</div>
    return <div>Apply loan</div>
   }
   else if (selectedOption === 'selectCreditCard') {
    return <div>Select Credit Card</div>
   }
   else {
    return <div>Unable to access backend selected data. Please try again.</div>
   }
 };
 
 export default JsonFormat;