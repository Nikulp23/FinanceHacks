import './index.css'
import React, { useEffect, useState } from 'react';

// import NavBar from '../Components/Navbar/Navbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import Content from '../Components/Content/Content'

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('welcome');
  const [banks, setBanks] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
      
        setSelectedAddress([latitude,longitude]);

        console.log("HOME: ", selectedAddress)
      });
    }
    else {
      console.log("Geolocation is not supported by this browser.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
   <>
      {/* <NavBar /> */}
      <Sidebar setSelectedOption={setSelectedOption} banks={banks} setBanks={setBanks} selectedAddress={selectedAddress} />  
      <Content selectedOption={selectedOption} banks={banks}/>
   </>
  )
}

export default Home

