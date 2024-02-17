import './index.css'
import React, { useState } from 'react';

// import NavBar from '../Components/Navbar/Navbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import Content from '../Components/Content/Content'

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('welcome');

  return (
   <>
      {/* <NavBar /> */}
      <Sidebar setSelectedOption={setSelectedOption}/>  
      <Content selectedOption={selectedOption}/>
   </>
  )
}

export default Home

