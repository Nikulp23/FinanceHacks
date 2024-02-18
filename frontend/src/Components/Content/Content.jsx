import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Content.css';
import SearchBar from '../SearchBar/SearchBar';

import JsonFormat from '../JsonFormats/JsonFormat.jsx'
import { leapfrog } from 'ldrs'

leapfrog.register();

const Content = ({selectedOption}) => {

  const axiosCancelSource = useRef(null);

  const [conversation, setConversation] = useState([]);
  const [step, setStep] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);

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
        options: [{ label: "US", value: "US Citizenship" }, { label: "NON US", value: "Non-US Citizenship" }]
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
        options: [{ label: "Student Loan", value: "Students Loan" }, { label: "Personal Loan", value: "Personal Loan" }]
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
            options: [{ label: "20+", value: "20+" }, { label: "60+", value: "60+" }]
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
  };

 
 // CHAT FEATURES - WORKS FOR ALL PART
 const sendMessage = async (userMessage) => {
  setLoading(true);
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

  setLoading(false);
};

const getLoanInformation = async (choices) => {
  setLoading(true);
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
  setLoading(false);
};

// Define the function to make the API call
const getAccountInformation = async (choices) => {
  setLoading(true);
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

  setLoading(false);
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
                  <button key={idx} onClick={() => handleButtonClick(option.value)}>
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {loading && 
          <l-leapfrog
            size="46"
            speed="2.5" 
            color="black" 
            className="loading"
          ></l-leapfrog>}
      </div>
      <SearchBar onSend={sendMessage} />
    </div>
  );
};

export default Content;