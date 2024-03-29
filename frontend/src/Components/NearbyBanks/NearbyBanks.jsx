import './NearbyBanks.css'
// import WF from'../../assets/banks/wellsfargo.png';
import {React, useEffect} from 'react';
import axios from 'axios';

const NearbyBanks = ({ banks, setBanks, selectedAddress}) => {
   // State to store bank data
  //  const [localBanks, setLocalBanks] = useState([]);
 

  const bankImages = {
    'wells fargo': "/banks/wellsfargo.png",
    'chase': "/banks/chase.png",
    'saratoga': "/banks/saratoga.png",
    'm&t': "/banks/mt.jpg",
    'trustco': "/banks/trustco.jpg",
    'bank of america': "/banks/bankofamerica.jpg",
    'pioneer': "/banks/pioneer.jpg",
    'keybank': "/banks/keybank.png",
    'broadview': "/banks/broadview.png",
    'bravest': "/banks/bravest.png",
    'troy community': "/banks/troyCommunity.png",
    'sunmark': "/banks/sunmark.jpg",
  };

   // Function to fetch bank data 
   const fetchBanks = async () => {
     try {
        const response = await axios.post('http://localhost:8080/getBanks', {
        USER_ADDRESS: selectedAddress
       });
      //  console.log(response);
       setBanks(response.data.banks); 
      //  setLocalBanks(response.data.banks)
     } catch (error) {
       console.error('Error fetching banks:', error);
       // Handle error appropriately
     }
   };

  const getBankImage = (bankName) => {
    const normalizedBankName = bankName.toLowerCase();
  
    // Loop through the bankImages keys to find a matching bank
    for (const [key, value] of Object.entries(bankImages)) {
      if (normalizedBankName.includes(key)) {
        return value; // Return the image path if a match is found
      }
    }
  
    return "/banks/default.png"; // Return a default image path if no match is found
  };
 
   // UseEffect to call fetchBanks on component mount
   useEffect(() => {
    if (selectedAddress != null){
      fetchBanks();
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectedAddress]);

  return (
    <>
      <div className="sidebar-bottom">
        <div className="find-branches">
          <h2>📍Nearby Banks</h2>
          <div className="branch-list">
            {banks.map((bank, index) => (
              <div key={index} className="branch">
                <img src={getBankImage(bank.name)} alt="Bank Icon" className="branch-icon" />
                <div className="branch-info">
                  <strong>{bank.name}</strong>
                  <p>{bank.distance} miles away</p>
                  <p>{bank.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default NearbyBanks

