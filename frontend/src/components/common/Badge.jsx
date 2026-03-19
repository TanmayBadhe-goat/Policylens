import React from 'react';

const Badge = ({ children, variant = 'neutral', className = '' }) => {
    const styles = {
        neutral: 'bg-slate-100 text-slate-600 border-slate-200',
        primary: 'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-600 border-violet-200',
        secondary: 'bg-white text-slate-600 border-slate-200',
        success: 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-600 border-emerald-200',
        warning: 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-600 border-amber-200',
        info: 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-600 border-cyan-200',
        destructive: 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-600 border-rose-200',
        accent: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 border-orange-200',
        indigo: 'bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-600 border-indigo-200',
    };

    return (
        <span className={`
            inline-flex items-center gap-1.5 px-3 py-1.5 
            rounded-lg text-[10px] font-bold uppercase tracking-wider 
            border transition-all duration-200
            ${styles[variant] || styles.neutral} 
            ${className}
        `}>
            {children}
        </span>
    );
};

export default Badge;
