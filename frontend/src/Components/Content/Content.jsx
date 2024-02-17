import React, { useState } from 'react';
import axios from 'axios';
import './Content.css';
import SearchBar from '../SearchBar/SearchBar';

const Content = () => {
  const [conversation, setConversation] = useState([]);
  const [step, setStep] = useState(0);
  const [userChoices, setUserChoices] = useState([]); // New state to track user choices

  // Function to handle adding a new message to the conversation
  const addMessageToConversation = (message) => {
    setConversation((prevConvo) => [...prevConvo, message]);
  };

  const handleButtonClick = (userChoice) => {
    const updatedChoices = [...userChoices, userChoice]; // Update user choices with the current selection
    setUserChoices(updatedChoices); // Save updated choices
  
    // Add the user's choice to the conversation
    addMessageToConversation({ text: userChoice, sender: 'user', type: 'text' });
  
    // Check the current step in the conversation to determine the next action
    switch (step) {
      case 0: // After the citizenship status question
        // Proceed to ask the age question
        addMessageToConversation({
          text: "What is your age?",
          sender: 'ai',
          type: 'buttons',
          options: [{ label: "20+", value: "20+" }, { label: "60+", value: "60+" }]
        });
        break;
      case 1: // After the age question
        // This is where all details have been entered, call the API function
        getAccountInformation(updatedChoices);
        break;
      default:
        console.log("Conversation end or unknown step.");
    }
  
    // Advance the conversation step
    setStep(prevStep => prevStep + 1);
  };  

  // Initialize the conversation with the first AI message
  if (conversation.length === 0) {
    addMessageToConversation({
      text: "Welcome, we are here to help you. Before we proceed you will need to answer some questions.",
      sender: 'ai',
      type: 'text'
    });
    addMessageToConversation({
      text: "What is your citizenship status?",
      sender: 'ai',
      type: 'buttons',
      options: [{ label: "US", value: "US Citizenship" }, { label: "NON US", value: "Non-US Citizenship" }]
    });
  }

  const sendMessage = async (userMessage) => {
    const updatedConversation = [...conversation, { text: userMessage, sender: 'user', type: 'text' }];
    setConversation(updatedConversation);

    try {
      const response = await axios.post('http://localhost:8080/getResponse', { conversation: updatedConversation });
      setConversation(prevConvo => [...prevConvo, { text: response.data, sender: 'ai', type: 'text' }]);
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

 // Define the function to make the API call
 const getAccountInformation = async (choices) => {
  try {
    // Assuming `choices` is an array of user selections you want to send to your backend
    // You might need to adjust the structure of the data you're sending based on your backend requirements
    const response = await axios.post('http://localhost:8080/account', { choices });

    // Add the response from the backend as a new AI message to the conversation
    addMessageToConversation({
      text: response.data, // Use the response data directly since it's a simple text message
      sender: 'ai',
      type: 'text'
    });
  } catch (error) {
    console.error('API call failed:', error);
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
      </div>
      <SearchBar onSend={sendMessage} />
    </div>
  );
};

export default Content;