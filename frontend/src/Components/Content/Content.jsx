import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Content.css';
import SearchBar from '../SearchBar/SearchBar';

const Content = ({ selectedOption }) => {
  const initialMessages = {
    welcome: "Welcome to Bank of the Future! How can I assist you today?",
    openAccount: "Interested in opening an account? What type of account would you like?",
    applyLoan: "Looking to apply for a loan? What kind of loan are you interested in?",
    selectCreditCard: "Selecting a credit card? What features are you looking for?"
  };

  const [conversation, setConversation] = useState([{ text: initialMessages[selectedOption], sender: 'ai' }]);

  useEffect(() => {
    setConversation([{ text: initialMessages[selectedOption], sender: 'ai' }]);
  }, [selectedOption]);
  
  const sendMessage = async (userMessage) => {
    const updatedConversation = [...conversation, { text: userMessage, sender: 'user' }];
    setConversation(updatedConversation);

    try {
      const response = await axios.post('http://localhost:8080/getResponse', { conversation: updatedConversation });
      setConversation(prevConvo => [...prevConvo, { text: response.data, sender: 'ai' }]);
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  return (
    <>
      <div className="content">
        <div className="conversation">
          {conversation.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="avatar" />
              <span>{message.text}</span>
            </div>
          ))}
        </div>
        <SearchBar onSend={sendMessage} />
      </div>   
    </>
  );
};

export default Content;