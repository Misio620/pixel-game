import React from "react";
import { cn } from "../../lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface PixelButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline";
}

export const PixelButton: React.FC<PixelButtonProps> = ({
    className,
    variant = "primary",
    children,
    ...props
}) => {
    const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-pixel text-xs uppercase transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-retro-primary text-white border-4 border-white shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] hover:bg-red-600",
        secondary: "bg-retro-secondary text-black border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] hover:bg-green-400",
        outline: "bg-transparent text-white border-4 border-white hover:bg-white/10"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
};
