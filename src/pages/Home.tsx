import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const handleStart = () => {
        if (!userId.trim()) return;
        localStorage.setItem('pixel_game_user_id', userId);
        navigate('/game', { state: { fromHome: true } });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#202020]">
            <div className="w-full max-w-lg mx-auto">
                {/* White Pixel Card Container */}
                <div className="bg-white p-8 md:p-12 relative shadow-[8px_8px_0_0_#000]">
                    {/* Decorative Pixel Corners for the White Card */}
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-4 h-4 bg-[#202020]" />
                    <div className="absolute top-0 left-0 -mt-2 -ml-2 w-4 h-4 bg-[#202020]" />
                    <div className="absolute bottom-0 right-0 -mb-2 -mr-2 w-4 h-4 bg-[#202020]" />
                    <div className="absolute bottom-0 left-0 -mb-2 -ml-2 w-4 h-4 bg-[#202020]" />

                    <div className="space-y-8 text-center">
                        {/* Title: PIXEL QUIZ */}
                        <h1 className="text-4xl md:text-5xl font-pixel text-[#fca000] tracking-widest drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                            PIXEL QUIZ
                        </h1>

                        <div className="space-y-6">
                            <p className="font-pixel text-black text-sm md:text-base tracking-widest">
                                ENTER YOUR ID TO START
                            </p>

                            {/* Input: Black BG, Yellow Border */}
                            <input
                                type="text"
                                placeholder="PLAYER..."
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                                className="w-full bg-black text-white font-pixel text-lg p-4 border-4 border-[#fca000] outline-none placeholder:text-gray-600 focus:scale-[1.02] transition-transform"
                                autoFocus
                            />
                        </div>

                        {/* Button: Simple 'START GAME' Text Style */}
                        <div className="pt-4">
                            <button
                                onClick={handleStart}
                                disabled={!userId.trim()}
                                className="font-pixel text-xl text-black hover:text-[#fca000] disabled:opacity-30 disabled:hover:text-black transition-colors animate-pulse"
                            >
                                {userId.trim() ? '> START GAME <' : 'START GAME'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
