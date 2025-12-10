import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PixelCard } from '../components/ui/PixelCard';
import { PixelButton } from '../components/ui/PixelButton';
import { api } from '../services/api';
import type { Question, QuestionHistory } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTION_COUNT = Number(import.meta.env.VITE_QUESTION_COUNT) || 5;

export const QuizScreen: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [history, setHistory] = useState<QuestionHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchedRef = React.useRef(false);

    // "Boss" Avatar Seed
    const [seed, setSeed] = useState(Math.random().toString());
    const location = useLocation();

    useEffect(() => {
        // Enforce starting from Home
        if (!location.state?.fromHome) {
            navigate('/', { replace: true });
            return;
        }

        const loadQuestions = async () => {
            if (fetchedRef.current) return;
            fetchedRef.current = true;

            try {
                const data = await api.getQuestions(QUESTION_COUNT);
                setQuestions(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        loadQuestions();
    }, []);

    const handleAnswer = (optionKey: string) => {
        const currentQ = questions[currentIndex];
        const isCorrect = currentQ.answer === optionKey;

        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        // Record History
        const newHistoryItem: QuestionHistory = {
            id: currentQ.id,
            question: currentQ.text,
            userAnswer: optionKey,
            correctAnswer: currentQ.answer,
            isCorrect,
            options: currentQ.options
        };
        const updatedHistory = [...history, newHistoryItem];
        setHistory(updatedHistory);

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(prev => prev + 1);
            setSeed(Math.random().toString());
        } else {
            // Game Over
            const finalScore = isCorrect ? score + 1 : score;
            navigate('/result', {
                state: {
                    score: finalScore,
                    total: questions.length,
                    history: updatedHistory
                }
            });
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">LOADING...</div>;
    if (questions.length === 0) return <div className="min-h-screen flex items-center justify-center">NO QUESTIONS FOUND</div>;

    const currentQ = questions[currentIndex];

    return (
        <div className="min-h-dvh w-full p-4 flex flex-col items-center justify-center max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="w-full mb-6 flex justify-between items-center text-xs">
                <span>LVL {currentIndex + 1}</span>
                <div className="h-4 w-48 border-2 border-white bg-black">
                    <div
                        className="h-full bg-retro-secondary transition-all duration-300"
                        style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
                    />
                </div>
                <span>SCORE: {score * 100}</span>
            </div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentIndex}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    className="w-full"
                >
                    {/* Boss Section */}
                    <div className="flex justify-center mb-4 md:mb-8">
                        <div className="relative">
                            <img
                                src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}`}
                                alt="Boss"
                                className="w-20 h-20 md:w-28 md:h-28 image-pixelated animate-bounce"
                            />
                            <div className="absolute -bottom-4 w-full text-center bg-black border border-white text-[10px] py-1 shadow-lg">
                                BOSS #{currentIndex + 1}
                            </div>
                        </div>
                    </div>

                    <PixelCard className="mb-6 min-h-[120px] flex items-center justify-center">
                        <h2 className="text-center text-lg md:text-xl leading-[1.8] tracking-wide">{currentQ.text}</h2>
                    </PixelCard>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(currentQ.options).map(([key, value]) => (
                            <PixelButton
                                key={key}
                                variant="outline"
                                onClick={() => handleAnswer(key)}
                                className="w-full text-left justify-start hover:bg-white/20 text-sm md:text-base leading-[1.8]"
                            >
                                <span className="text-retro-yellow mr-2">{key}.</span> {value}
                            </PixelButton>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
