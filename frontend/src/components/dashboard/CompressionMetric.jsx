import React from 'react';

const CompressionMetric = ({ label, value, original, current, color = 'blue' }) => {
    const percentage = ((current / original) * 100).toFixed(0);

    const colors = {
        blue: 'bg-blue-500',
        green: 'bg-emerald-500',
        purple: 'bg-violet-500',
        orange: 'bg-orange-500'
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">{label}</span>
                <span className="font-bold text-slate-900">{value} tokens</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={`h-full ${colors[color]} transition-all duration-700 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <p className="text-[10px] text-slate-400 text-right">
                {percentage}% of original
            </p>
        </div>
    );
};

export default CompressionMetric;
