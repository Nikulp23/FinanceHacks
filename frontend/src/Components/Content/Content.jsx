import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Content.css';
import SearchBar from '../SearchBar/SearchBar';

import JsonFormat from '../JsonFormats/JsonFormat.jsx'

const Content = ({selectedOption}) => {

  const axiosCancelSource = useRef(null);

  const [conversation, setConversation] = useState([]);
  const [step, setStep] = useState(0);
  const [userChoices, setUserChoices] = useState([]);

  const [hasSentMessage, setHasSentMessage] = useState(false);

  useEffect(() => {
    if (selectedOption !== 'general') {
      setHasSentMessage(false);
    } 

    return () => {
      if (axiosCancelSource.current) {
        axiosCancelSource.current.cancel("Component unmounted: Request canceled.");
      }
    };
  }, [selectedOption]);

  useEffect(() => {
    // Reset the conversation when the selected option changes
    if (selectedOption === 'openAccount') {
      // Initialize with the first message for 'openAccount'
      setConversation([{
        text: "Welcome! We're here to assist you with opening an account. Before we proceed, we'll need you to answer a few questions.",
        sender: 'ai',
        type: 'text'
      }, {
        text: "What is your citizenship status?",
        sender: 'ai',
        type: 'buttons',
        options: [{ label: "US CITIZEN", value: "US CITIZEN" }, { label: "NON US CITIZEN", value: "NON US CITIZEN" }]
      }]);
      setUserChoices([]);
      setStep(0);
    } 
    else if (selectedOption === 'applyLoan'){

      // Initialize with the first message for 'openAccount'
      setConversation([{
        text: "Welcome! We're here to guide you through the loan application process. Before we can proceed, we'll need you to answer some questions.",
        sender: 'ai',
        type: 'text'
      }, {
        text: "What type of Loan do you want?",
        sender: 'ai',
        type: 'buttons',
        options: [{ label: "STUDENT LOAN", value: "STUDENT LOAN" }, { label: "PERSONAL LOAN", value: "PERSONAL LOAN" }]
      }]);
      setUserChoices([]);
      setStep(0);
    }
    else if (selectedOption === 'selectCreditCard'){

      // Initialize with the first message for 'openAccount'
      setConversation([{
        text: "Welcome! We're here to assist you with your credit card needs. Before we proceed, please answer a few questions to help us serve you better.",
        sender: 'ai',
        type: 'text'
      }, {
        text: "What type of card do you want?",
        sender: 'ai',
        type: 'buttons',
        options: [{ label: "STUDENT CARD", value: "STUDENT CARD" }, { label: "BUSINESS CARD", value: "BUSINESS CARD" }, {label: "TRAVEL CARD", value: "TRAVEL CARD"},{label: "REWARDS CARD", value: "REWARDS CARD"}]
      }]);
      setUserChoices([]);
      setStep(0);
    }
    
    else {
      // Clear the conversation for other options
      setConversation([]);
      setUserChoices([]);
      setStep(0);
    }

    return () => {
      if (axiosCancelSource.current) {
        axiosCancelSource.current.cancel("Component unmounted: Request canceled.");
      }
    };
  }, [selectedOption]);

  // Function to handle adding a new message to the conversation
  const addMessageToConversation = (message) => {
    setConversation((prevConvo) => [...prevConvo, message]);
  };

  // THIS CODE SAVES THE USERS BUTTON SELECTION
  const handleButtonClick = (userChoice) => {
   
    // Only proceed if 'openAccount' is selected
    if (selectedOption === 'openAccount') {
      const updatedChoices = [...userChoices, userChoice];
      setUserChoices(updatedChoices);
    
      // Add user choice to the conversation
      addMessageToConversation({ text: userChoice, sender: 'user', type: 'text' });
    
      // Logic for 'openAccount'
      switch (step) {
        case 0:
          // Ask the next question
          addMessageToConversation({
            text: "What is your age?",
            sender: 'ai',
            type: 'buttons',
            options: [{ label: "AGE: BELOW 20 YEARS", value: "BELOW 20 YEARS" }, { label: "AGE: 20 - 40 Years", value: "20 - 40 YEARS" }, { label: "Age: 40+ YEARS", value: "40+ YEARS" }]
          });
          break;
        case 1:
          // Make API call with the user's choices
          getAccountInformation(updatedChoices);
          break;
        default:
          console.log("Conversation end or unknown step.");
      }
    
      // Move to the next step
      setStep(prevStep => prevStep + 1);
    }

    // ONLY PROCEED IF OPTION IS LOANS
    // Only proceed if 'openAccount' is selected
    if (selectedOption === 'applyLoan') {
      const updatedChoices = [...userChoices, userChoice];
      setUserChoices(updatedChoices);
    
      // Add user choice to the conversation
      addMessageToConversation({ text: userChoice, sender: 'user', type: 'text' });
    
      // Logic for 'openAccount'
      switch (step) {
        case 0:
          // Ask the next question
          addMessageToConversation({
            text: "What is your approximate credit score?",
            sender: 'ai',
            type: 'buttons',
            options: [{ label: "CREDIT SCORE: BELOW 650", value: "CREDIT SCORE: BELOW 650" }, { label: "CREDIT SCORE: ABOVE 650", value: "CREDIT SCORE ABOVE 650+ "}]
          });
          break;
        case 1:
          // Make API call with the user's choices
          getLoanInformation(updatedChoices);
          break;
        default:
          console.log("Conversation end or unknown step.");
      }
    
      // Move to the next step
      setStep(prevStep => prevStep + 1);
    }

    // ONLY PROCEED IF OPTION IS LOANS
    // Only proceed if 'openAccount' is selected
    if (selectedOption === 'selectCreditCard') {
      const updatedChoices = [...userChoices, userChoice];
      setUserChoices(updatedChoices);
    
      // Add user choice to the conversation
      addMessageToConversation({ text: userChoice, sender: 'user', type: 'text' });
    
      // Logic for 'openAccount'
      switch (step) {
        case 0:
          // Ask the next question
          addMessageToConversation({
            text: "What is your approximate credit score?",
            sender: 'ai',
            type: 'buttons',
            options: [{ label: "CREDIT SCORE: BELOW 650", value: "CREDIT SCORE: BELOW 650" }, { label: "CREDIT SCORE: ABOVE 650", value: "CREDIT SCORE ABOVE 650+ "}]
          });
          break;
        case 1:
          // Make API call with the user's choices
          getCreditInformation(updatedChoices);
          break;
        default:
          console.log("Conversation end or unknown step.");
      }
    
      // Move to the next step
      setStep(prevStep => prevStep + 1);
    }
  };

 // CHAT FEATURES - WORKS FOR ALL PART
 const sendMessage = async (userMessage) => {
  setHasSentMessage(true);
  // Update the conversation state immediately with user message
  const updatedConversation = [...conversation, { text: userMessage, sender: 'user', type: 'text' }];
  setConversation(updatedConversation);

  // Cancel any ongoing request
  if (axiosCancelSource.current) {
    axiosCancelSource.current.cancel("Cancelling previous request.");
  }
  // Create a new cancel token source for this request
  axiosCancelSource.current = axios.CancelToken.source();

  try {
    const response = await axios.post('http://localhost:8080/getResponse', { conversation: updatedConversation }, {
      cancelToken: axiosCancelSource.current.token // Use the cancel token in this request
    });
    setConversation(prevConvo => [...prevConvo, { text: response.data, sender: 'ai', type: 'text' }]);
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error('API call failed:', error);
    }
  }
};

// CREDIT CARD INFORMATION
const getCreditInformation = async (choices) => {
  if (axiosCancelSource.current) {
    axiosCancelSource.current.cancel("Cancelling previous request.");
  }
  axiosCancelSource.current = axios.CancelToken.source(); // Create a new cancel token source

  try {
    const response = await axios.post('http://localhost:8080/getCredit', { choices }, {
      cancelToken: axiosCancelSource.current.token // Use the cancel token in the request
    });

    addMessageToConversation({
      text: response.data,
      sender: 'ai',
      type: 'json'
    });
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error('API call failed:', error);
    }
  }
}

const getLoanInformation = async (choices) => {
  if (axiosCancelSource.current) {
    axiosCancelSource.current.cancel("Cancelling previous request.");
  }
  axiosCancelSource.current = axios.CancelToken.source(); // Create a new cancel token source

  try {
    const response = await axios.post('http://localhost:8080/getLoans', { choices }, {
      cancelToken: axiosCancelSource.current.token // Use the cancel token in the request
    });

    addMessageToConversation({
      text: response.data,
      sender: 'ai',
      type: 'json'
    });
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error('API call failed:', error);
    }
  }
};

// Define the function to make the API call
const getAccountInformation = async (choices) => {
  // Cancel any ongoing request
  if (axiosCancelSource.current) {
    axiosCancelSource.current.cancel("Cancelling previous request.");
  }
  // Create a new cancel token source for this request
  axiosCancelSource.current = axios.CancelToken.source();

  try {
    const response = await axios.post('http://localhost:8080/account', { choices }, {
      cancelToken: axiosCancelSource.current.token // Use the cancel token in the request
    });

    addMessageToConversation({
      text: response.data,
      sender: 'ai',
      type: 'json'
    });
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error('API call failed:', error);
    }
  }
};

  return (
    <div className="content">
      {selectedOption === 'general' && !hasSentMessage && (
        <div className="welcome-message">
          <h2>Welcome!</h2>
          <p>Please send us a message to get started.</p>
        </div>
      )}
      <div className="conversation">
        {conversation.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="avatar" />
            {message.type === 'text' ? (
              <span>{message.text}</span>
            ) : message.type === 'json' ? (
              <JsonFormat data={message.text} selectedOption={selectedOption} />
            ) : (
              <div className="button-options">
                {message.options.map((option, idx) => (
                  <button className='button-4' key={idx} onClick={() => handleButtonClick(option.value)}>
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <SearchBar onSend={sendMessage} />
    </div>
  );
};

export default Content;