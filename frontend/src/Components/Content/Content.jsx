import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Content.css'
import SearchBar from '../SearchBar/SearchBar'

const Content = () => {
  const [conversation, setConversation] = useState([]);

  const sendMessage = async (userMessage) => {
    const updatedConversation = [...conversation, { text: userMessage, sender: 'user' }];
    setConversation(updatedConversation);

    try {
      const response = await axios.post('http://localhost:8080/getResponse', { conversation: updatedConversation });
      
      setConversation(prevConvo => [...prevConvo, { text: response.data, sender: 'AI' }]);
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  useEffect(() => {
  }, [conversation]);

  return (
   <>
      <div className="content">
        <div className="conversation">
          {conversation.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <SearchBar onSend={sendMessage} />
        {/* <SearchBar /> */}
      </div>   
   </>
  )
}

export default Content

