# Dependencies & Setup

This project runs natively on macOS.

## Required Tools
- **Node.js** (v18+ recommended)
- **npm** or **pnpm**

## Installation
1. Clone the repository.
2. Run `npm install` to install project dependencies.
3. Create a `.env` file in the root directory with your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   PORT=3001
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Troubleshooting
If `npm install` fails due to permission issues, please run it with appropriate user privileges or check your Node environment.
