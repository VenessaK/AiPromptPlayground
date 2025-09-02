import React from "react";

function PromptHistory({ history, reusePrompt }) {
    return (
        <div style={{ marginTop: "20px" }}>
            <h3>Prompt History (click to reuse):</h3>
            {history.map((item, index) => (
                <div
                    key={index}
                    style={{ border: "1px solid #eee", padding: "5px", marginBottom: "5px", cursor: "pointer" }}
                    onClick={() => reusePrompt(item)}
                >
                    <strong>Prompt:</strong> {item.prompt.substring(0, 50)}...
                </div>
            ))}
        </div>
    );
}

export default PromptHistory;
