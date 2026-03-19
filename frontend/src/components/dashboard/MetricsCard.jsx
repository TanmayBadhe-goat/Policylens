import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MetricsCard = ({ label, value, color = 'violet', trend, icon: Icon }) => {
    const colorStyles = {
        violet: 'from-violet-500 to-purple-600',
        cyan: 'from-cyan-500 to-blue-600',
        emerald: 'from-emerald-500 to-teal-600',
        amber: 'from-amber-500 to-orange-600',
        rose: 'from-rose-500 to-pink-600',
        indigo: 'from-indigo-500 to-violet-600'
    };

    const bgColorStyles = {
        violet: 'from-violet-50 to-purple-50 border-violet-100/50',
        cyan: 'from-cyan-50 to-blue-50 border-cyan-100/50',
        emerald: 'from-emerald-50 to-teal-50 border-emerald-100/50',
        amber: 'from-amber-50 to-orange-50 border-amber-100/50',
        rose: 'from-rose-50 to-pink-50 border-rose-100/50',
        indigo: 'from-indigo-50 to-violet-50 border-indigo-100/50'
    };

    return (
        <div className="group relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${colorStyles[color]} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`}></div>
            <div className={`relative bg-gradient-to-br ${bgColorStyles[color]} backdrop-blur-sm border rounded-2xl p-6 hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-start justify-between mb-4">
                    {Icon && (
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorStyles[color]} flex items-center justify-center text-white shadow-lg`}>
                            <Icon size={20} />
                        </div>
                    )}
                    {trend && (
                        <div className={`flex items-center gap-1 text-xs font-bold ${trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {trend.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {trend}
                        </div>
                    )}
                </div>
                <div className="text-3xl font-display font-black text-slate-900 tracking-tight mb-1">{value}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</div>
            </div>
        </div>
    );
};

export default MetricsCard;
