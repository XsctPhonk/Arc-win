import { NextRequest } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return new Response("Invalid messages", { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Arc, an arcade game strategy assistant. Provide helpful, concise, and clear advice on winning arcade games, ticket collection, and claw machines.",
        },
        ...messages,
      ],
      stream: true,
    });

    return new Response(response.body, {
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    return new Response("OpenAI API error", { status: 500 });
  }
}
