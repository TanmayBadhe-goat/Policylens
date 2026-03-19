import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, FileText } from 'lucide-react';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';

const BillCard = ({ bill }) => {
    return (
        <Link 
            to={`/bill/${bill.id}`}
            className="group cursor-pointer relative block"
        >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
            
            <div className="relative bg-white/80 backdrop-blur-sm border border-violet-100/50 rounded-3xl p-6 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1">
                {/* Top accent gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-t-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-2 mb-2">
                            {bill.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <FileText size={12} />
                            <span>{bill.id}</span>
                        </div>
                    </div>
                    <Badge variant={bill.status === 'Active' ? 'success' : 'secondary'} className="ml-3">
                        {bill.status || 'Active'}
                    </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 mb-5">
                    <Calendar size={12} />
                    <span className="font-medium">{bill.date || '2024-01-15'}</span>
                </div>

                <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Compression</span>
                        <span className="text-sm font-bold text-violet-600">{bill.compression || 82}%</span>
                    </div>
                    <ProgressBar 
                        value={bill.compression || 82} 
                        color="gradient"
                    />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-violet-100/50">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                            <FileText size={14} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">View Details</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-500 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg">
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BillCard;
