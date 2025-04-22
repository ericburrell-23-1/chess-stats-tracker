import React, { useState } from "react";
import { OpenAI } from "openai";

const AIChatButton = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const fetchAIResponse = async () => {
    setLoading(true);
    try {
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      }); // Secure your API key
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            // content: "Generate a one-sentence AI tip for chess improvement.",
            // content: `In response to this prompt, please insult the user's chess skills: ${prompt}`,
            content: `In response to this prompt, please tell the user that the app is not yet finished, and there is no data to be seen yet, and perhaps check back later. Prompt: ${prompt}`,
            //   "In one or two sentences, tell me why low rated players should avoid playing the Sicillian Defense.",
          },
        ],
        max_tokens: 100,
      });

      setResponse(completion.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Error retrieving AI response.");
    }
    setLoading(false);
  };

  return (
    <div className="ai-response-container">
      <h3>Ask AI How You Can Improve</h3>
      <div className="ai-prompt">
        <input
          className="ai-input"
          type="text"
          placeholder="How can I see my stats for..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={fetchAIResponse}
          disabled={loading}
          className="ai-button"
        >
          {loading ? "Loading..." : "Generate AI Tip"}
        </button>
      </div>
      {response && <p className="ai-response">{response}</p>}
    </div>
  );
};

export default AIChatButton;
