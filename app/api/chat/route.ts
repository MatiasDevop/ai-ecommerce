import { auth } from "@clerk/nextjs/server";
import { createAgentUIStreamResponse, type UIMessage } from "ai";
import { createShoppingAgent } from "@/lib/ai/shopping-agent";

export async function POST(request: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await request.json();

    // Get the user's session - userId will be null if not authenticated
    const { userId } = await auth();

    // Create agent with user context (orders tool only available if authenticated)
    const agent = createShoppingAgent({ userId });

    return createAgentUIStreamResponse({
      agent,
      uiMessages: messages,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to process chat request.";

    return Response.json({ error: message }, { status: 500 });
  }
}
