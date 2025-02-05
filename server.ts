const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.EXPRESS_NVIDIA_NIM_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

app.post("/chat", async (req: any, res: any) => {
  const { prompt } = req.body;

  const completion = await openai.chat.completions.create({
    model: "meta/llama-3.1-405b-instruct",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
    top_p: 0.7,
    max_tokens: 1024,
    stream: true,
  });

  const response = [];

  for await (const chunk of completion) {
    response.push(chunk.choices[0]?.delta?.content || "");
  }

  res.send({
    response: response.join(""),
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
