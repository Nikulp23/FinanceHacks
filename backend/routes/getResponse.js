import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyCp4kRI9XDs4rDs6AQusexuPbHemYC5CPk");

router.post(`/${parsed.name}`, async (req, res) => {

    const conversation = req.body.conversation; 

    let prompt = "This is a chat between a user and an AI. Read the previous conversation and answer the next question. It's your turn.\n\n";

    conversation.forEach((message, index) => {
        // Assuming 'user' messages are from the human and 'ai' messages from the AI.
        const prefix = message.sender === 'user' ? 'User:' : 'AI:';
        prompt += `${prefix} ${message.text}\n`;
    });

    // Add an instruction for the AI to generate a response.
    prompt += "AI:";

   try {
       // Assuming genAI.getGenerativeModel is your method to get the AI model
       const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        // Generate a response based on the constructed prompt
        const result = await model.generateContent(prompt);

        const aiResponse = result.response; // Assuming this is the AI response
        const text = aiResponse.text();
        res.send(text);
   } catch (error) {
       console.error('Error generating AI response:', error);
       res.status(500).send({ error: 'Failed to generate AI response' });
   }
});

export default router;