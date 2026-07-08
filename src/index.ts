import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GenimService } from './api/genim.service.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files for the UI
app.use(express.static('public'));

// Initialize service with API key from .env
const apiKey = process.env.GEMINI_API_KEY || '';
const genimService = new GenimService(apiKey);

app.post('/api/generate', async (req, res) => {
  const { prompt, modelId } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const imageBuffer = await genimService.generateImage(prompt, modelId);
    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error: any) {
    console.error('Generation failed:', error);
    // Return the specific error message from the service to the UI
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`[GENIM] Cyberpunk engine running at http://localhost:${port}`);
  if (!apiKey) {
    console.warn('[WARNING] GEMINI_API_KEY is not set in .env. Image generation will fail.');
  }
});