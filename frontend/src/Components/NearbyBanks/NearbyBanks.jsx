import './NearbyBanks.css'
// import WF from'../../assets/banks/wellsfargo.png';
// import {React, useState, useEffect} from 'react';
// import axios from 'axios';

const NearbyBanks = () => {
   // State to store bank data
   // const [banks, setBanks] = useState([]);
 
   // // Function to fetch bank data
   // const fetchBanks = async () => {
   //   try {
   //     const response = await axios.get('http://localhost:8080/getBanks');
   //     setBanks(response.data.banks); // Assuming the API response structure includes { banks: [...] }
   //   } catch (error) {
   //     console.error('Error fetching banks:', error);
   //     // Handle error appropriately
   //   }
   // };
 
   // // UseEffect to call fetchBanks on component mount
   // useEffect(() => {
   //   fetchBanks();
   // }, []);

  return (
    <>
      <div className="sidebar-bottom">
        <div className="find-branches">
          {/* <h2>📍Find Branches/ATMs</h2>
          <div className="branch-list">
            {banks.map((bank, index) => (
              <div key={index} className="branch">
                <img src={WF} alt="Bank Icon" className="branch-icon" />
                <div className="branch-info">
                  <strong>{bank.name}</strong>
                  <p>{bank.address}, {bank.distance} miles away</p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default NearbyBanks

