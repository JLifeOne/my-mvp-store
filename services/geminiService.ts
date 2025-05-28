
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AiFilterCriteria, ProductCategory } from '../types';
import { GEMINI_API_KEY, GEMINI_MODEL_NAME } from '../constants';

if (!GEMINI_API_KEY) {
  console.warn(
    "Gemini API Key not found. Please set the API_KEY environment variable. AI features will not work."
  );
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY || "YOUR_API_KEY_HERE" }); // Fallback for environments where process.env might not be set up during dev before bundling

const getFilterPrompt = (userQuery: string, availableCategories: ProductCategory[]): string => `
You are an intelligent e-commerce assistant. Your task is to parse the user's natural language query and convert it into a structured JSON filter object.
The products have the following attributes that can be filtered:
- 'category': string (Available categories: ${JSON.stringify(availableCategories)})
- 'minPrice': number
- 'maxPrice': number
- 'minRating': number (1-5, can be float like 3.5)
- 'colors': string[] (e.g., ['Red', 'Blue', 'Black'])
- 'searchTerm': string (for general keyword searches in product name or description)

Based on the user's query: "${userQuery}", provide a JSON object with the filter criteria.
If a filter type is not specified or cannot be reasonably inferred, omit it from the JSON.
Ensure 'minPrice', 'maxPrice', and 'minRating' are numbers. 'searchTerm' should be a string containing relevant keywords. 'colors' should be an array of strings.
If the user mentions a specific product type that matches a category, set the category. If they mention general terms, use searchTerm.

Example 1:
User query: "Show me red t-shirts under $50"
JSON_OUTPUT:
{
  "category": "Apparel",
  "colors": ["Red"],
  "maxPrice": 50,
  "searchTerm": "t-shirts"
}

Example 2:
User query: "electronics with at least 4 stars rating"
JSON_OUTPUT:
{
  "category": "Electronics",
  "minRating": 4
}

Example 3:
User query: "cheap books about coding"
JSON_OUTPUT:
{
  "category": "Books",
  "maxPrice": 30,
  "searchTerm": "coding books"
}

User query: "${userQuery}"
JSON_OUTPUT:
`;


export const geminiService = {
  getFiltersFromQuery: async (query: string, availableCategories: ProductCategory[]): Promise<AiFilterCriteria> => {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
      console.error("Gemini API Key is not configured.");
      throw new Error("AI filtering is currently unavailable. API Key not configured.");
    }

    try {
      const prompt = getFilterPrompt(query, availableCategories);
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          // For low latency, consider disabling thinking:
          // thinkingConfig: { thinkingBudget: 0 } 
          // However, for better parsing, default thinking is often better.
        },
      });
      
      let jsonStr = response.text.trim();
      
      // Remove markdown fences if present
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = jsonStr.match(fenceRegex);
      if (match && match[2]) {
        jsonStr = match[2].trim();
      }

      const parsedCriteria = JSON.parse(jsonStr) as AiFilterCriteria;
      
      // Basic validation/sanitization
      const validatedCriteria: AiFilterCriteria = {};
      if (parsedCriteria.category && availableCategories.includes(parsedCriteria.category)) {
        validatedCriteria.category = parsedCriteria.category;
      }
      if (typeof parsedCriteria.minPrice === 'number') validatedCriteria.minPrice = parsedCriteria.minPrice;
      if (typeof parsedCriteria.maxPrice === 'number') validatedCriteria.maxPrice = parsedCriteria.maxPrice;
      if (typeof parsedCriteria.minRating === 'number' && parsedCriteria.minRating >=0 && parsedCriteria.minRating <=5) {
        validatedCriteria.minRating = parsedCriteria.minRating;
      }
      if (Array.isArray(parsedCriteria.colors) && parsedCriteria.colors.every(c => typeof c === 'string')) {
        validatedCriteria.colors = parsedCriteria.colors;
      }
      if (typeof parsedCriteria.searchTerm === 'string') validatedCriteria.searchTerm = parsedCriteria.searchTerm;

      return validatedCriteria;

    } catch (error) {
      console.error('Error fetching or parsing AI filters:', error);
      if (error instanceof Error && error.message.includes("API key not valid")) {
         throw new Error("AI filtering failed: Invalid API Key. Please check your configuration.");
      }
      throw new Error('Failed to process your request with AI. The AI might be a bit confused, try rephrasing your query.');
    }
  },
};
