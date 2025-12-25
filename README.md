# Credit Compass - AI-Powered Credit Card Recommendation Website

A credit card recommendation website with an AI chatbot that answers questions about credit cards and provides personalized card recommendations.

## Features

- **AI Chatbot Integration**: Powered by Chatbase API for answering credit card questions
- **Smart Follow-up Questions**: Uses OpenAI API to generate relevant follow-up questions
- **Interactive Chat Interface**: Real-time chat with message history and suggested questions
- **Credit Card Recommendations**: Get personalized card recommendations based on your needs

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up environment variables.
# Create a .env file in the root directory with the following variables:
# VITE_CHATBASE_API_KEY=your_chatbase_api_key_here
# VITE_CHATBASE_CHATBOT_ID=your_chatbase_chatbot_id_here
# OPENAI_API_KEY=your_openai_api_key_here (server-side only, not exposed to browser)

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Environment Variables Setup

This project requires the following environment variables to be set in a `.env` file:

1. **CHATBASE_API_KEY**: Your Chatbase API key
   - Get it from your Chatbase dashboard
   - Required for chatbot functionality

2. **CHATBASE_CHATBOT_ID**: Your Chatbase chatbot ID
   - Get it from your Chatbase dashboard
   - Required for chatbot functionality

3. **OPENAI_API_KEY**: Your OpenAI API key
   - Get it from https://platform.openai.com/api-keys
   - Used for generating suggested follow-up questions
   - **IMPORTANT**: This is a server-side environment variable (NOT prefixed with VITE_)
   - The API key is stored server-side and never exposed to the browser for security
   - Optional: If not provided, default questions will be used

### Creating the .env file

Create a `.env` file in the root directory of the project:

```bash
# Chatbase Configuration (client-side, prefixed with VITE_)
VITE_CHATBASE_API_KEY=your_chatbase_api_key_here
VITE_CHATBASE_CHATBOT_ID=your_chatbase_chatbot_id_here

# OpenAI Configuration (server-side, NOT prefixed with VITE_)
# This key is only used in serverless functions and never exposed to the browser
OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: 
- Chatbase variables use `VITE_` prefix because they're used in client-side code
- OpenAI API key does NOT use `VITE_` prefix because it's only used in server-side API routes
- For Vercel deployment, set `OPENAI_API_KEY` in your Vercel project settings (Settings > Environment Variables)

## How the Chatbot Works

1. **User Input**: Users can type questions in the input bar at the bottom of the chat interface
2. **Chatbase Integration**: Questions are sent to the Chatbase API, which processes them using your configured chatbot
3. **Response Display**: The chatbot's response is displayed in the chat interface
4. **Suggested Questions**: After receiving a response, OpenAI generates relevant follow-up questions (if API key is configured)
5. **Suggested Question Buttons**: Users can click on suggested question buttons to automatically send that question to the chatbot

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
