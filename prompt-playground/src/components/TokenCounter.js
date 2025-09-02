import React from "react";

function TokenCounter({ tokenCount }) {
    return (
        <div style={{ marginTop: "20px" }}>
            <strong>Token Count (approx.):</strong> {tokenCount}
        </div>
    );
}

export default TokenCounter;
