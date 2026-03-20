import React from 'react';

const Button = ({ variant = 'primary', className = '', children, ...props }) => {
    const variants = {
        primary: "bg-blue-600 text-white rounded-lg px-6 py-3 font-bold hover:bg-blue-700 transition-colors shadow-sm",
        secondary: "bg-white text-slate-800 rounded-lg px-6 py-3 font-bold hover:bg-slate-100 transition-colors border-2 border-slate-200",
        ghost: "text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-6 py-3 font-bold transition-colors",
        outline: "border-2 border-blue-600 text-blue-600 rounded-lg px-6 py-3 hover:bg-blue-50 font-bold transition-colors",
        destructive: "bg-red-600 text-white rounded-lg px-6 py-3 font-bold hover:bg-red-700 transition-colors shadow-sm",
        accent: "bg-yellow-400 text-slate-900 rounded-lg px-6 py-3 font-bold hover:bg-yellow-500 transition-colors shadow-sm",
    };

    return (
        <button className={`${variants[variant] || variants.primary} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
