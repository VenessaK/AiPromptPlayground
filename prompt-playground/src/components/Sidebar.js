import React from "react";

function Sidebar({
    models, model, setModel,
    temperature, setTemperature,
    topP, setTopP,
    role, setRole,
    customRole, setCustomRole,
    format, setFormat,
    tone, setTone,
    wordLimit, setWordLimit, // only controls AI response
    fewShot, setFewShot,
    instructionMode, setInstructionMode,
    outputParsing, setOutputParsing,
    handleClear
}) {

    // Handle few-shot text input, max 100 words
    const handleFewShotChange = (e) => {
        const text = e.target.value;
        const words = text.trim().split(/\s+/);
        if (words.length <= 100) {
            setFewShot(text);
        } else {
            setFewShot(words.slice(0, 100).join(" "));
        }
    };

    // Handle persona selection and custom persona input
    const handleRoleChange = (e) => {
        const value = e.target.value;
        setRole(value);
        // If user selects "custom", keep role empty but let customRole be used
        if (value !== "custom") {
            setCustomRole("");
        }
    };

    return (
        <div className="sidebar">
            <h2>Prompt Settings</h2>

            <div className="sidebar-section">
                <label>Select Model:</label>
                <select value={model} onChange={e => setModel(e.target.value)}>
                    {models.map(m => (
                        <option key={m.id} value={m.id} title={m.tooltip}>{m.name}</option>
                    ))}
                </select>
            </div>

            <div className="sidebar-section">
                <label>
                    Temperature: {temperature.toFixed(2)}
                    <span title="Controls creativity of AI responses. Low = factual/conservative, High = creative/unpredictable" style={{ marginLeft: "5px", cursor: "help" }}>ⓘ</span>
                </label>
                <input type="range" min="0" max="1" step="0.05" value={temperature} onChange={e => setTemperature(parseFloat(e.target.value))} />
            </div>

            <div className="sidebar-section">
                <label>
                    Top-P: {topP.toFixed(2)}
                    <span title="Nucleus sampling: alternative to temperature controlling randomness" style={{ marginLeft: "5px", cursor: "help" }}>ⓘ</span>
                </label>
                <input type="range" min="0" max="1" step="0.05" value={topP} onChange={e => setTopP(parseFloat(e.target.value))} />
            </div>

            <div className="sidebar-section">
                <label>Role / Persona:</label>
                <select value={role || "default"} onChange={handleRoleChange}>
                    <option value="default">Default</option>
                    <option value="teacher">Teacher</option>
                    <option value="pirate">Pirate</option>
                    <option value="shakespeare">Shakespeare</option>
                    <option value="lawyer">Lawyer</option>
                    <option value="custom">Custom</option>
                </select>
                {role === "custom" && (
                    <input
                        type="text"
                        placeholder="Enter custom persona"
                        value={customRole}
                        onChange={e => setCustomRole(e.target.value)}
                    />
                )}
            </div>

            <div className="sidebar-section">
                <label>
                    Answer Format:
                    <span title="Paragraph, bullet list, numbered list" style={{ marginLeft: "5px", cursor: "help" }}>ⓘ</span>
                </label>
                <select value={format} onChange={e => setFormat(e.target.value)}>
                    <option value="paragraph">Paragraph</option>
                    <option value="bullet">Bullet List</option>
                    <option value="numbered">Numbered List</option>
                </select>
            </div>

            <div className="sidebar-section">
                <label>
                    Tone:
                    <span title="Control the tone of the AI response (casual, formal, technical, etc.)" style={{ marginLeft: "5px", cursor: "help" }}>ⓘ</span>
                </label>
                <select value={tone} onChange={e => setTone(e.target.value)}>
                    <option value="neutral">Neutral</option>
                    <option value="formal">Formal</option>
                    <option value="casual">Casual</option>
                    <option value="technical">Technical</option>
                    <option value="creative">Creative</option>
                </select>
            </div>

            <div className="sidebar-section">
                <label>
                    Word Limit: {wordLimit}
                    <span title="Maximum words the AI should use" style={{ marginLeft: "5px", cursor: "help" }}>ⓘ</span>
                </label>
                <input type="range" min="10" max="100" step="1" value={wordLimit} onChange={e => setWordLimit(parseInt(e.target.value))} />
            </div>

            <div className="sidebar-section">
                <label>
                    Few-shot Example:
                    <span title="Provide example input/output to guide AI response" style={{ marginLeft: "5px", cursor: "help" }}>ⓘ</span>
                </label>
                <textarea
                    rows={3}
                    placeholder="Optional few-shot examples"
                    value={fewShot}
                    onChange={handleFewShotChange}
                />
                <small>{fewShot.split(/\s+/).filter(Boolean).length}/100 words</small>
            </div>

            <div className="sidebar-section">
                <label>
                    Instruction Mode:
                    <span title="Choose instruction-based or chat-based behavior" style={{ marginLeft: "5px", cursor: "help" }}>ⓘ</span>
                </label>
                <select value={instructionMode} onChange={e => setInstructionMode(e.target.value)}>
                    <option value="default">Default</option>
                    <option value="instruction">Instruction</option>
                    <option value="chat">Chat</option>
                </select>
            </div>

            <div className="sidebar-section">
                <label>
                    Output Parsing:
                    <span title="Select structured output format: text, JSON, table, CSV" style={{ marginLeft: "5px", cursor: "help" }}>ⓘ</span>
                </label>
                <select value={outputParsing} onChange={e => setOutputParsing(e.target.value)}>
                    <option value="text">Text</option>
                    <option value="json">JSON</option>
                    <option value="table">Table</option>
                    <option value="csv">CSV</option>
                </select>
            </div>

            <button onClick={handleClear}>Clear Prompt</button>
        </div>
    );
}

export default Sidebar;
