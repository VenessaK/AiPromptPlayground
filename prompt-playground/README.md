# AI Prompt Engineering Showcase

## Overview

This project demonstrates a web app designed to showcase prompt engineering skills and effective communication with LLMs (Large Language Models). The focus is on structuring prompts, managing model responses, and providing users with dynamic control over model behavior through adjustable features.

Think of it like a Prompt Engineering Playground: users can experiment with different prompts, tweak model settings, and observe how LLMs respond in real-time, highlighting both technical skill and creative prompt strategies.

## Project Structure

```
project-root/
│
├── src/                     # Main frontend source code (React.js)
├── public/                  # Static/public files
├── api.js                   # API call functions for OpenRouter
├── App.js                   # Core React app logic
├── components/              # UI components (tables, modals, forms)
├── package.json             # Project metadata & dependencies
└── README.md                # Project documentation
```

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### Install Dependencies

```bash
npm install
```

### Start the Project

```bash
npm start
```

The app should open at `http://localhost:3000`.

## Features

- **Dynamic Prompt Input** → Users can send prompts to the selected LLM.
- **Model Selection** → Switch between multiple LLMs to test different outputs.
- **Temperature Control** → Adjust randomness of model responses (hover tooltip explains usage).
- **Top-p Control** → Fine-tune probability distribution for more creative or focused responses.
- **Clear Prompt Button** → Reset the input field easily.
- **Response Formatting** → Supports text and Markdown formatting.
- **Prompt Engineering Playground** → Space to experiment with prompt structure, role instructions, and output styles.
- **Real-Time Feedback** → See how small changes to prompts or settings affect LLM output.
- **Demo-ready Layout** → Clean spacing and UI for showcasing skills to others.

## Why This Project Works

- **Practical Showcase** → Demonstrates how prompt engineering influences model output.
- **Hands-On Experimentation** → Users can directly test prompts and settings.
- **Readable Output** → Responses are formatted and easy to review.
- **Highlighting LLM Knowledge** → Shows understanding of model parameters and prompt design.

## Technologies Used

- **React.js** → Frontend framework for interactive UI.
- **Node.js** → Backend runtime environment.
- **JavaScript (ES6+)** → Core development language.
- **OpenRouter API** → Access LLMs for dynamic responses.
- **Reactstrap + Formik + Yup** → UI components and form validation.
- **Environment Variables (.env)** → Secure API key management.

## License

This project is shared for demonstration and portfolio purposes only. It is not intended for commercial use.
