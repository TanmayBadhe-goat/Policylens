import React from 'react';
import Badge from '../common/Badge';
import { BookOpen, CheckCircle2 } from 'lucide-react';

const SummarySection = ({ title, content, children }) => {
    if (!content) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h2>
                </div>
                <Badge variant="indigo">Verified AI Insights</Badge>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm leading-loose text-gray-700 space-y-6">
                {content.split('\n\n').map((paragraph, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="mt-1.5 flex-shrink-0">
                            <CheckCircle2 size={18} className="text-emerald-500" />
                        </div>
                        <p className="text-[15px] font-medium leading-relaxed">
                            {paragraph}
                        </p>
                    </div>
                ))}
            </div>

            {children}
        </div>
    );
};

export default SummarySection;
