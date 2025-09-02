import React from "react";
import ReactMarkdown from "react-markdown";

function ChatBox({ prompt, setPrompt, handleSend, loading, response, wordLimit }) {

    const handleChange = (e) => {
        const input = e.target.value;
        const words = input.trim().split(/\s+/);
        if (words.length <= 100) { // fixed 100 words for chat input
            setPrompt(input);
        } else {
            setPrompt(words.slice(0, 100).join(" "));
        }
    };

    const currentWordCount = prompt.trim() === "" ? 0 : prompt.trim().split(/\s+/).length;

    return (
        <div className="chat-box">
            <textarea
                rows={5}
                value={prompt}
                onChange={handleChange}
                placeholder="Type your prompt here (max 100 words)..."
            />
            <div style={{ marginBottom: "5px", fontSize: "12px", color: currentWordCount > 100 ? "red" : "black" }}>
                {currentWordCount} / 100 words
            </div>
            <button onClick={handleSend} disabled={loading || currentWordCount === 0}>
                {loading ? "Sending..." : "Send"}
            </button>
            <div className="response">
                <h2>Response:</h2>
                <ReactMarkdown>{response}</ReactMarkdown>
            </div>
        </div>
    );
}

export default ChatBox;
