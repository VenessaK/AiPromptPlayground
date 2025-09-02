export async function sendPrompt(prompt, model, temperature = 0.7, role = "user") {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`
            },
            body: JSON.stringify({
                model: model,                   // selected model
                messages: [
                    { role: "system", content: role }, // system message defines the AI behavior
                    { role: "user", content: prompt }
                ],
                temperature: temperature,       // controls creativity
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || `API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error calling OpenRouter:", error);
        throw error;
    }
}
