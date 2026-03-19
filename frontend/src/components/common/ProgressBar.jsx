import React from 'react';

const ProgressBar = ({ value, max = 100, label, color = 'indigo' }) => {
    const percentage = Math.round((value / max) * 100);

    const colors = {
        indigo: 'bg-indigo-600',
        blue: 'bg-blue-500',
        emerald: 'bg-emerald-500',
        violet: 'bg-violet-600',
        purple: 'bg-purple-600',
        gradient: 'bg-gradient-to-r from-violet-600 to-purple-600',
    };

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>
                    <span className="text-xs font-black text-slate-900">{percentage}%</span>
                </div>
            )}
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div
                    className={`h-full ${colors[color]} rounded-full transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
