import React from "react";
import { cn } from "../../lib/utils";

export const PixelCard: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
    return (
        <div
            className={cn(
                "bg-retro-dark border-4 border-white p-4 md:p-6 relative",
                "shadow-[8px_8px_0_0_rgba(0,0,0,0.5)]",
                className
            )}
            {...props}
        >
            <div className="absolute top-0 right-0 -mt-2 -mr-2 w-4 h-4 bg-white" />
            <div className="absolute top-0 left-0 -mt-2 -ml-2 w-4 h-4 bg-white" />
            <div className="absolute bottom-0 right-0 -mb-2 -mr-2 w-4 h-4 bg-white" />
            <div className="absolute bottom-0 left-0 -mb-2 -ml-2 w-4 h-4 bg-white" />
            {children}
        </div>
    );
};
