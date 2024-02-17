import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const parsed = path.parse(__filename);

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyCp4kRI9XDs4rDs6AQusexuPbHemYC5CPk");

router.post(`/${parsed.name}`, async (req, res) => {

   const conversion = req.body.conversion;

//    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
//    const result = await model.generateContent("how are you doing!");
//    const response = result.response;
//    const text = response.text();

   res.send("test message");
});

export default router;