import './index.css'
import React, { useState } from 'react';

// import NavBar from '../Components/Navbar/Navbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import Content from '../Components/Content/Content'

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('welcome');
  const [banks, setBanks] = useState([]);


  return (
   <>
      {/* <NavBar /> */}
      <Sidebar setSelectedOption={setSelectedOption} banks={banks} setBanks={setBanks} />  
      <Content selectedOption={selectedOption} banks={banks}/>
   </>
  )
}

export default Home

