import React, { useState } from 'react';
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
      
      setConversation(prevConvo => [...prevConvo, { text: response.data, sender: 'ai' }]);
      console.log(conversation)
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
              {/* The avatar div is always rendered, but its order will change based on the message sender */}
              <div className="avatar" />
              <span>{message.text}</span>
            </div>
          ))}
        </div>
        <SearchBar onSend={sendMessage} />
      </div>   
   </>
  )
}

export default Content

