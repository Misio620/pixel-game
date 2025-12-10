import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PixelCard } from '../components/ui/PixelCard';
import { PixelButton } from '../components/ui/PixelButton';
import { api } from '../services/api';
import type { QuestionHistory } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const PASS_THRESHOLD = Number(import.meta.env.VITE_PASS_THRESHOLD) || 5;

export const ResultScreen: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [showReview, setShowReview] = useState(false);

    const score = state?.score || 0;
    const total = state?.total || 10;
    const passed = score >= PASS_THRESHOLD;
    const history = (state?.history || []) as QuestionHistory[];
    const isAlreadySubmitted = state?.submitted === true;
    const userId = localStorage.getItem('pixel_game_user_id') || 'UNKNOWN';

    const submittedRef = React.useRef(false);

    useEffect(() => {
        const submit = async () => {
            if (submittedRef.current || isAlreadySubmitted) return;
            submittedRef.current = true;

            setSubmitting(true);
            try {
                await api.submitResult({
                    userId,
                    score,
                    totalQuestions: total,
                    passed,
                    timestamp: new Date().toISOString()
                });

                // Mark as submitted in history state to prevent refresh-resubmit
                navigate(location.pathname, {
                    replace: true,
                    state: { ...state, submitted: true }
                });
            } catch (err) {
                console.error(err);
            } finally {
                setSubmitting(false);
            }
        };
        if (state) submit();
    }, [state, userId, score, total, passed, isAlreadySubmitted, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <AnimatePresence>
                {showReview ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    >
                        <PixelCard className="space-y-4">
                            <h2 className="text-xl text-center mb-4 text-retro-yellow">REVIEW</h2>
                            {history.map((item, idx) => (
                                <div key={idx} className="border-b-2 border-dashed border-gray-700 pb-4 text-xs md:text-sm">
                                    <p className="mb-2 text-white">{idx + 1}. {item.question}</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className={item.isCorrect ? "text-retro-secondary" : "text-retro-primary"}>
                                            YOURS: {item.userAnswer}
                                        </div>
                                        <div className="text-retro-secondary">
                                            ANS: {item.correctAnswer} ({item.options[item.correctAnswer]})
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <PixelButton onClick={() => setShowReview(false)} variant="outline" className="w-full mt-4">
                                CLOSE
                            </PixelButton>
                        </PixelCard>
                    </motion.div>
                ) : (
                    <PixelCard className="text-center w-full max-w-[90vw] md:max-w-md space-y-6">
                        <h1 className="text-2xl md:text-3xl mb-4">
                            {passed ? <span className="text-retro-secondary">MISSION COMPLETE</span> : <span className="text-retro-primary">GAME OVER</span>}
                        </h1>

                        <div className="py-8 space-y-2 border-y-4 border-dashed border-gray-600">
                            <p className="text-gray-400 text-xs">FINAL SCORE</p>
                            <p className="text-4xl md:text-6xl text-retro-yellow">{score * 100}</p>
                            <p className="text-xs">
                                {score} / {total} CORRECT
                            </p>
                        </div>

                        {submitting ? (
                            <p className="animate-pulse text-xs">SAVING DATA...</p>
                        ) : (
                            <div className="space-y-4 pt-4">
                                <PixelButton onClick={() => setShowReview(true)} variant="secondary" className="w-full">
                                    REVIEW ANSWERS
                                </PixelButton>
                                <div className="flex gap-2">
                                    <PixelButton onClick={() => navigate('/game')} variant="primary" className="flex-1">
                                        RETRY
                                    </PixelButton>
                                    <PixelButton onClick={() => navigate('/')} variant="outline" className="flex-1">
                                        MENU
                                    </PixelButton>
                                </div>
                            </div>
                        )}
                    </PixelCard>
                )}
            </AnimatePresence>
        </div>
    );
};
