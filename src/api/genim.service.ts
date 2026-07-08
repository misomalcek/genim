import { GoogleGenAI } from "@google/genai";

export class GenimService {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateImage(prompt: string, modelId: string = "gemini-3.1-flash-image") {
    try {
      const interaction = await this.ai.interactions.create({
        model: modelId,
        input: prompt,
      });

      const generatedImage = interaction.output_image;
      if (generatedImage) {
        return Buffer.from(generatedImage.data, "base64");
      }
      throw new Error("No image data returned from Gemini.");
    } catch (error: any) {
      console.error("GenimService Error:", error);
      const message = error.message || "Unknown error during generation";
      throw new Error(`[Gemini API Error] ${message}`);
    }
  }

  async generateArticleImage(articleTitle: string, articleContentSnippet: string) {
    const prompt = `Create a high-quality, cyberpunk-style title image for an article titled "${articleTitle}". 
    The article content is: "${articleContentSnippet}". 
    The image should be cinematic, with neon lights, futuristic textures, and a mood that matches the content. 
    Avoid text in the image unless it's part of the background atmosphere. 
    Style: Cyberpunk, high-fidelity, digital art.`;
    
    return this.generateImage(prompt);
  }
}