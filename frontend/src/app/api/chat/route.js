import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// Create a new GenerativeModel instance
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const systemPrompt = `You are an AI assistant specialized in helping developers with their GitHub repositories. Your knowledge spans various programming languages, software development practices, and GitHub features. Please provide concise, accurate, and helpful responses to questions about code, repository management, GitHub workflows, and best practices in software development Here is a codebase in which the user is .`;

export async function POST(req) {
  try {
    const { messages, slug, accessToken } = await req.json();
    console.log("sludge", slug);
    const context = await axios.get(
      `https://dt-backend.mpst.me/repository/parse?repo=${slug}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(context.data);

    // Prepare the conversation for Gemini
    const conversation = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Start a chat session
    const chat = model.startChat({
      history: conversation.slice(0, -1), // Exclude the last user message from history
    });

    // Send the system prompt and the last user message to get a response
    const result = await chat.sendMessage([
      { text: `${systemPrompt} ${context.data.data.file_tree}` },
      { text: messages[messages.length - 1].content },
    ]);
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
