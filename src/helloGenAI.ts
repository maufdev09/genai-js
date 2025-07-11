import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";

dotenv.config();

const llm = new ChatOpenAI({
  modelName:"gpt-4.1-mini",
});

const response = await llm.invoke(
  "Describe the importance of learning generative AI for javascript developers in 50 words."
);

console.log(response.content);
