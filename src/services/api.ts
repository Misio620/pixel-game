import axios from 'axios';
import type { ApiQuestion, GameResult, Question } from '../types';

const API_URL = import.meta.env.VITE_GOOGLE_APP_SCRIPT_URL || '';

export const api = {
    getQuestions: async (count: number): Promise<Question[]> => {
        if (!API_URL) {
            console.warn("API URL not set, using mock data");
            return mockQuestions.slice(0, count);
        }
        try {
            const response = await axios.get(`${API_URL}?action=getQuestions&count=${count}`);
            // Transform API response to internal format if needed
            return response.data.map((q: ApiQuestion) => ({
                id: q.id,
                text: q.question,
                options: { A: q.A, B: q.B, C: q.C, D: q.D },
                answer: q.answer
            }));
        } catch (error) {
            console.error("Failed to fetch questions", error);
            throw error;
        }
    },

    submitResult: async (result: GameResult) => {
        if (!API_URL) return;
        try {
            // Use default fetch with 'no-cors' mode might be needed for GAS web app sometimes, 
            // but axios post is usually standard. 
            // GAS Web App often requires strictly following redirects or using text/plain for POST to avoid CORS preflight issues.
            // For simplicity, we assume standard JSON behavior or use a work-around.
            // "Content-Type": "text/plain;charset=utf-8" is a common GAS hack to avoid OPTIONS request.
            await axios.post(API_URL, JSON.stringify({
                action: 'submitScore',
                ...result
            }), {
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                }
            });
        } catch (error) {
            console.error("Failed to submit score", error);
            throw error;
        }
    }
};

const mockQuestions: Question[] = [
    { id: 1, text: "Pixel art originated in which decade?", options: { A: "1970s", B: "1980s", C: "1990s", D: "2000s" }, answer: "A" as const },
    { id: 2, text: "What is the hex code for white?", options: { A: "#000000", B: "#FFFFFF", C: "#FF0000", D: "#00FF00" }, answer: "B" as const },
    { id: 3, text: "Which game popularized isometric pixel art?", options: { A: "SimCity 2000", B: "Doom", C: "Pong", D: "Tetris" }, answer: "A" as const },
];
