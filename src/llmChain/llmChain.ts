import { LLMChain } from 'langchain/chains';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatOpenAI } from '@langchain/openai';
import  dotenv  from 'dotenv';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';

dotenv.config()
await personalisedPitch("Generative AI", "Javascript", 100)

async function personalisedPitch(
    course: string,
    role:string,
   wordLimit:number
) {

    const promptTemplate = new PromptTemplate({
    template:"Describe the importance of learning {course} for a {role}. Limit the output to {wordLimit} words .",
    inputVariables:["course","role","wordLimit"]
})

const fromattedPromt=await promptTemplate.format({
    course,
    role,
    wordLimit,
})

    
console.log("Formatted Prompt:", fromattedPromt );

const llm = new ChatOpenAI({
  modelName:"gpt-4.1-mini",
  maxTokens:150,
//   temperature:1,
//   topP:1,

});

const outputParser=new StringOutputParser()

// Option 1- Langchain Legacy Chain

// const legacyllmChain= new LLMChain({
//     prompt: promptTemplate,
//     llm,
//     outputParser
// })
// 
// const answer =await legacyllmChain.invoke({
//     course,
//     role,
//     wordLimit
// })
// 
// console.log(answer);

// Option 1- LCEL Chain


// const lcelChain=promptTemplate.pipe(llm).pipe(outputParser)

const lcelChain= RunnableSequence.from([
    promptTemplate,
    llm,
    outputParser
])


const lcelResponse= await lcelChain.invoke({
    course,
    role,
    wordLimit
})

console.log("Answer from lcel:" , lcelResponse);


}



