import React, { useState } from "react";
import { sendPrompt } from "./api";
import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";
import PromptHistory from "./components/PromptHistory";
import TokenCounter from "./components/TokenCounter";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [model, setModel] = useState("deepseek/deepseek-r1-0528:free");
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [role, setRole] = useState("default");   // start with "default"
  const [customRole, setCustomRole] = useState("");
  const [format, setFormat] = useState("paragraph");
  const [tone, setTone] = useState("neutral");
  const [wordLimit, setWordLimit] = useState(50);
  const [fewShot, setFewShot] = useState("");
  const [instructionMode, setInstructionMode] = useState("default");
  const [outputParsing, setOutputParsing] = useState("text");
  const [history, setHistory] = useState([]);
  const [tokenCount, setTokenCount] = useState(0);

  const models = [
    { id: "deepseek/deepseek-r1-0528:free", name: "DeepSeek R1", tooltip: "General-purpose model." },
    { id: "qwen/qwen3-coder:free", name: "Qwen3 Coder", tooltip: "Best for code generation." },
    { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Llama 3.3", tooltip: "Strong reasoning and instruction following." },
    { id: "google/gemma-3-27b-it:free", name: "Gemma 3", tooltip: "Ideal for technical tasks and IT queries." }
  ];

  const handleSend = async () => {
    const promptWordCount = prompt.trim().split(/\s+/).filter(Boolean).length;
    if (!prompt.trim() || promptWordCount > 100) return;

    setLoading(true);
    try {
      // ✅ Always prefix persona with "Persona:"
      const personaText =
        role === "custom" && customRole.trim() !== ""
          ? `Persona: ${customRole}`
          : role !== "default"
            ? `Persona: ${role}`
            : "Persona: Helpful Assistant";

      let enhancedPrompt = `${personaText}\nTone: ${tone}\nFormat: ${format}\nWord Limit: ${wordLimit}\nInstruction Mode: ${instructionMode}\nOutput Type: ${outputParsing}\n\n`;
      if (fewShot) enhancedPrompt += `Example:\n${fewShot}\n\n`;
      enhancedPrompt += prompt;

      const aiResponse = await sendPrompt(enhancedPrompt, model, temperature, personaText, topP);
      setResponse(aiResponse);

      setHistory((prev) => [{ prompt: enhancedPrompt, response: aiResponse }, ...prev]);
      setTokenCount(enhancedPrompt.split(" ").length + aiResponse.split(" ").length);
    } catch (error) {
      setResponse("Error calling OpenRouter API: " + error.message);
    }
    setLoading(false);
  };

  const handleClear = () => {
    setPrompt("");
    setResponse("");
  };

  const reusePrompt = (item) => setPrompt(item.prompt);

  return (
    <div className="app-container">
      <Sidebar
        models={models}
        model={model} setModel={setModel}
        temperature={temperature} setTemperature={setTemperature}
        topP={topP} setTopP={setTopP}
        role={role} setRole={setRole}
        customRole={customRole} setCustomRole={setCustomRole}
        format={format} setFormat={setFormat}
        tone={tone} setTone={setTone}
        wordLimit={wordLimit} setWordLimit={setWordLimit}
        fewShot={fewShot} setFewShot={setFewShot}
        instructionMode={instructionMode} setInstructionMode={setInstructionMode}
        outputParsing={outputParsing} setOutputParsing={setOutputParsing}
        handleClear={handleClear}
      />
      <div className="main">
        <h1>AI Prompt Playground</h1>
        <ChatBox
          prompt={prompt} setPrompt={setPrompt}
          handleSend={handleSend}
          loading={loading}
          response={response}
          wordLimit={100}
        />
        <TokenCounter tokenCount={tokenCount} />
        <PromptHistory history={history} reusePrompt={reusePrompt} />
      </div>
    </div>
  );
}

export default App;
