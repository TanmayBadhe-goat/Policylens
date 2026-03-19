import React from 'react';

const Card = ({ children, className = '', glass = false, noPadding = false }) => {
    const baseStyles = "rounded-3xl transition-all duration-300";
    const defaultStyles = "bg-white/80 backdrop-blur-sm border border-violet-100/50 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/10";
    const glassStyles = "bg-white/40 backdrop-blur-xl border border-white/20 hover:bg-white/50 hover:shadow-xl hover:shadow-violet-500/10";
    const paddingStyles = noPadding ? "" : "p-8";

    return (
        <div className={`${baseStyles} ${glass ? glassStyles : defaultStyles} ${paddingStyles} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
