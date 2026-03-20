import React from 'react';

const Card = ({ children, className = '', glass = false, noPadding = false }) => {
    const paddingStyles = noPadding ? "" : "p-6";

    return (
        <div className={`bg-white rounded-xl border-2 border-slate-200 shadow-sm transition-shadow hover:shadow ${paddingStyles} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
