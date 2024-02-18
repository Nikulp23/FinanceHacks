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

  useEffect(() => {
    // Reset the conversation when the selected option changes
    if (selectedOption === 'openAccount') {
      // Initialize with the first message for 'openAccount'
      setConversation([{
        text: "Welcome, we are here to help you to Opening an account. Before we proceed you will need to answer some questions.",
        sender: 'ai',
        type: 'text'
      }, {
        text: "What is your citizenship status?",
        sender: 'ai',
        type: 'buttons',
        options: [{ label: "US CITIZEN", value: "US Citizenship" }, { label: "NON US CITIZEN", value: "Non-US Citizenship" }]
      }]);
      setUserChoices([]);
      setStep(0);
    } 
    else if (selectedOption === 'applyLoan'){

      // Initialize with the first message for 'openAccount'
      setConversation([{
        text: "Welcome, we are here to help you to Apply Loan. Before we proceed you will need to answer some questions.",
        sender: 'ai',
        type: 'text'
      }, {
        text: "What type of Loan do you want?",
        sender: 'ai',
        type: 'buttons',
        options: [{ label: "STUDENT LOAN", value: "Students Loan" }, { label: "PERSONAL LOAN", value: "Personal Loan" }]
      }]);
      setUserChoices([]);
      setStep(0);
    }
    else if (selectedOption === 'selectCreditCard'){

      // Initialize with the first message for 'openAccount'
      setConversation([{
        text: "Welcome, we are here to help you to help you with Credit Card. Before we proceed you will need to answer some questions.",
        sender: 'ai',
        type: 'text'
      }, {
        text: "What type of card do you want?",
        sender: 'ai',
        type: 'buttons',
        options: [{ label: "STUDENT CARD", value: "Student Card" }, { label: "BUSINESS CARD", value: "Business Card" }, {label: "TRAVEL CARD", value: "Travel Card"},{label: "REWARDS CARD", value: "Rewards Card"}]
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
            options: [{ label: "Below 20 Years", value: "Below 20 Years" }, { label: "20 - 40 Years", value: "20 - 40 Years" }, { label: "60+ Years", value: "60+ Years" }]
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
            options: [{ label: "750+", value: "750+" }, { label: "600+", value: "600+" }]
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
            options: [{ label: "750+", value: "750+" }, { label: "600+", value: "600+" }]
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