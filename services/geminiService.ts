
import { GoogleGenAI, Type } from "@google/genai";
import type { ValidationResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        isCorrect: {
            type: Type.BOOLEAN,
            description: "Is the sentence grammatically correct and does it meet the challenge prompt?",
        },
        feedback: {
            type: Type.STRING,
            description: "Constructive feedback on the grammar. Explain why it is correct or incorrect. If incorrect, suggest a correction. Keep it concise and encouraging.",
        },
        score: {
            type: Type.INTEGER,
            description: "A score from 0 to 100 based on grammatical correctness, complexity, and relevance to the challenge prompt.",
        },
    },
    required: ["isCorrect", "feedback", "score"],
};

export const validateSentence = async (sentence: string, challenge: string): Promise<ValidationResult> => {
    try {
        const prompt = `
            Challenge: "${challenge}"
            Sentence to evaluate: "${sentence}"

            Analyze the sentence based on the challenge.
            1. Is the sentence grammatically correct?
            2. Does it fulfill the requirements of the challenge prompt?
            3. Provide brief, constructive feedback.
            4. Assign a score from 0 to 100.

            Return the analysis in JSON format.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonString = response.text.trim();
        const parsedResult: ValidationResult = JSON.parse(jsonString);
        
        // Basic validation of the parsed object
        if (typeof parsedResult.isCorrect !== 'boolean' || typeof parsedResult.feedback !== 'string' || typeof parsedResult.score !== 'number') {
            throw new Error("Invalid JSON structure from API");
        }

        return parsedResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to validate sentence with AI.");
    }
};
