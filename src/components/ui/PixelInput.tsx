import React from "react";
import { cn } from "../../lib/utils";

export const PixelInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
    return (
        <input
            className={cn(
                "w-full bg-black text-white border-4 border-white px-4 py-3 font-pixel outline-none focus:border-retro-yellow transition-colors placeholder:text-gray-600",
                className
            )}
            {...props}
        />
    );
};
