import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { ArrowRight, Minus, Plus } from 'lucide-react';

const DiffViewer = ({ diffs }) => {
    if (!diffs || diffs.length === 0) return null;

    return (
        <Card noPadding className="border-gray-100">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between font-bold text-xs text-gray-500 uppercase tracking-widest">
                <span>Legislative Diff Analysis</span>
                <Badge variant="neutral">Compare Mode</Badge>
            </div>
            <div className="divide-y divide-gray-50">
                {diffs.map((diff, i) => (
                    <div key={i} className="px-6 py-5 group hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-start gap-4">
                            <div className="mt-0.5 flex-shrink-0">
                                {diff.includes('increase') || diff.includes('New') || diff.includes('Broadening') ? (
                                    <div className="w-5 h-5 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                        <Plus size={12} strokeWidth={3} />
                                    </div>
                                ) : (
                                    <div className="w-5 h-5 rounded bg-amber-100 text-amber-600 flex items-center justify-center">
                                        <Minus size={12} strokeWidth={3} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 mb-1 leading-snug">
                                    {diff}
                                </p>
                                <div onClick={() => { }} className="text-[10px] font-bold text-indigo-600 uppercase tracking-tight flex items-center gap-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                    View Detailed Provision <ArrowRight size={10} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default DiffViewer;
