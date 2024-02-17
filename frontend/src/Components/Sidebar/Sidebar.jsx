import React, { useState } from 'react';
import './Sidebar.css';
import NearbyBanks from '../NearbyBanks/NearbyBanks';

const Sidebar = () => {
  // State to track the selected menu item, defaulting to 'welcome'
  const [selectedItem, setSelectedItem] = useState('welcome');

  // Function to handle menu item clicks
  const handleMenuItemClick = (itemName) => {
    console.log(itemName); // Log the name of the clicked item
    setSelectedItem(itemName);
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Bank of the Future</h1>
          <p>Trusted, AI-powered Data</p>
        </div>

        <div className="sidebar-menu">
          <button className={`menu-item ${selectedItem === 'welcome' ? 'selected' : ''}`} onClick={() => handleMenuItemClick('welcome')}>
            <span className="icon">🏠</span> Welcome
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

        <NearbyBanks />
      </div>
    </>
  );
};

export default Sidebar;