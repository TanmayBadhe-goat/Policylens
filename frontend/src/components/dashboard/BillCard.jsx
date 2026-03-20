import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, FileText } from 'lucide-react';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';

const BillCard = ({ bill }) => {
    return (
        <Link 
            to={`/bill/${bill.id}`}
            className="group block"
        >
            <div className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 mb-2 line-clamp-2">
                            {bill.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <FileText size={14} />
                            <span>{bill.id}</span>
                        </div>
                    </div>
                    <Badge variant={bill.status === 'Active' ? 'success' : 'secondary'} className="ml-3">
                        {bill.status || 'Active'}
                    </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 mb-6 bg-slate-50 p-2 rounded max-w-max">
                    <Calendar size={14} />
                    <span className="font-bold">{bill.date || '2024-01-15'}</span>
                </div>

                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Compression</span>
                        <span className="text-sm font-bold text-blue-600">{bill.compression || 82}%</span>
                    </div>
                    <ProgressBar 
                        value={bill.compression || 82} 
                        color="blue"
                    />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                            <FileText size={16} />
                        </div>
                        <span className="text-xs font-bold text-slate-600 uppercase">View Details</span>
                    </div>
                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BillCard;
