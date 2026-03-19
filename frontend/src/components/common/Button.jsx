import React from 'react';

const Button = ({ variant = 'primary', className = '', children, ...props }) => {
    const variants = {
        primary: "bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl px-8 py-4 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5 active:translate-y-0 font-bold transition-all duration-300",
        secondary: "bg-white/80 backdrop-blur-sm text-slate-700 border border-violet-100/50 rounded-2xl px-8 py-4 hover:bg-violet-50 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-0.5 active:translate-y-0 font-bold transition-all duration-300",
        ghost: "text-slate-600 hover:text-violet-600 hover:bg-violet-50 rounded-2xl px-6 py-3 font-bold transition-all duration-300",
        outline: "border-2 border-violet-200 text-violet-600 rounded-2xl px-8 py-4 hover:bg-violet-50 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-0.5 active:translate-y-0 font-bold transition-all duration-300",
        destructive: "bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-2xl px-8 py-4 shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 hover:-translate-y-0.5 active:translate-y-0 font-bold transition-all duration-300",
        accent: "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white rounded-2xl px-8 py-4 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 font-bold transition-all duration-300",
    };

    return (
        <button className={`${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
