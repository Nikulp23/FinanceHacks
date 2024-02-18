import React, { useState } from 'react';
import './Sidebar.css';
import NearbyBanks from '../NearbyBanks/NearbyBanks';
// import logo from "../../assets/ai.jpg"


const Sidebar = ({ setSelectedOption, banks, setBanks, selectedAddress }) => {
  // State to track the selected menu item, defaulting to 'general'
  const [selectedItem, setSelectedItem] = useState('general');
  // console.log("SIDEBAR: ",selectedAddress);

  // Function to handle menu item clicks
  const handleMenuItemClick = (itemName) => {
    setSelectedItem(itemName);
    setSelectedOption(itemName); 
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          {/* <img src={logo} sidebar-log alt="logo" className='sidebar-logo'/> */}
          <h1>Finance For All</h1>
          <p>Trusted, AI-powered Data</p>
        </div>

        <div className="sidebar-menu">
          <button className={`menu-item ${selectedItem === 'general' ? 'selected' : ''}`} onClick={() => handleMenuItemClick('general')}>
            <span className="icon">🏠</span> General
          </button>
          <button className={`menu-item ${selectedItem === 'openAccount' ? 'selected' : ''}`} onClick={() => handleMenuItemClick('openAccount')}>
            <span className="icon">👤</span> Open Account
          </button>
          <button className={`menu-item ${selectedItem === 'applyLoan' ? 'selected' : ''}`} onClick={() => handleMenuItemClick('applyLoan')}>
            <span className="icon">💰</span> Apply for Loan
          </button>
          <button className={`menu-item ${selectedItem === 'selectCreditCard' ? 'selected' : ''}`} onClick={() => handleMenuItemClick('selectCreditCard')}>
            <span className="icon">💳</span> Select Credit Card
          </button>
        </div>

        <NearbyBanks banks={banks} setBanks={setBanks} selectedAddress = { selectedAddress }/>
      </div>
    </>
  );
};

export default Sidebar;