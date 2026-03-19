import React, { useState } from 'react';
import useBillStore from '../store/useBillStore';
import { billService } from '../services/billService';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import {
    Scale,
    ArrowRight,
    RefreshCw,
    Layers,
    Check,
    AlertTriangle,
    Zap,
    ChevronDown,
    Plus,
    GitCompare,
    TrendingUp,
    FileText
} from 'lucide-react';

const CompareBills = () => {
    const { bills } = useBillStore();
    const [selectedIds, setSelectedIds] = useState([]);
    const [comparison, setComparison] = useState(null);
    const [loading, setLoading] = useState(false);

    const toggleBillSelection = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else if (selectedIds.length < 2) {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleCompare = async () => {
        if (selectedIds.length !== 2) return;
        setLoading(true);
        try {
            const data = await billService.compareBills(selectedIds);
            setComparison(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 min-h-screen animate-fade-in">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12 animate-slide-up">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-100 to-purple-100 px-5 py-2.5 rounded-xl border border-violet-200/50 text-violet-600 text-xs font-black uppercase tracking-widest mb-5">
                        <GitCompare size={14} />
                        Legislative Diff Engine
                    </div>
                    <h1 className="text-5xl font-display font-black text-slate-900 tracking-tight mb-4">Policy Evolution Analysis</h1>
                    <p className="text-lg text-slate-600 font-medium max-w-3xl leading-relaxed">
                        Select any two benchmarks to visualize structural legal shifts, penalty expansions, and compliance transformations in real-time.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-12 animate-slide-up animate-delay-100">
                    <div className={`flex items-center gap-3 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${selectedIds.length >= 1 ? 'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 border border-violet-200' : 'bg-slate-100 text-slate-400'}`}>
                        <div className={`w-3 h-3 rounded-full ${selectedIds.length >= 1 ? 'bg-gradient-to-r from-violet-500 to-purple-500' : 'bg-slate-300'}`}></div>
                        Select Bill A
                    </div>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-violet-200 to-fuchsia-200"></div>
                    <div className={`flex items-center gap-3 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${selectedIds.length === 2 ? 'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 border border-violet-200' : 'bg-slate-100 text-slate-400'}`}>
                        <div className={`w-3 h-3 rounded-full ${selectedIds.length === 2 ? 'bg-gradient-to-r from-violet-500 to-purple-500' : 'bg-slate-300'}`}></div>
                        Select Bill B
                    </div>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-fuchsia-200 to-emerald-200"></div>
                    <div className={`flex items-center gap-3 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${comparison ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-400'}`}>
                        <div className={`w-3 h-3 rounded-full ${comparison ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-slate-300'}`}></div>
                        View Results
                    </div>
                </div>

                {/* Selection Interface */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-slide-up animate-delay-200">
                    {bills.map((bill) => (
                        <div
                            key={bill.id}
                            onClick={() => toggleBillSelection(bill.id)}
                            className="group relative cursor-pointer"
                        >
                            {/* Glow effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 ${selectedIds.includes(bill.id) ? '!opacity-100' : ''}`}></div>
                            
                            <div className={`relative p-6 rounded-3xl border-2 transition-all duration-300 overflow-hidden
                                ${selectedIds.includes(bill.id)
                                    ? 'border-violet-400 bg-white shadow-2xl shadow-violet-500/20'
                                    : 'border-violet-100/50 bg-white/80 backdrop-blur-sm hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/10'}`}
                            >
                                {selectedIds.includes(bill.id) && (
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg animate-fade-in">
                                        <Check size={16} strokeWidth={3} />
                                    </div>
                                )}
                                
                                <div className="flex items-start gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${selectedIds.includes(bill.id) ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white' : 'bg-violet-50 text-violet-500 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-purple-600 group-hover:text-white'}`}>
                                        <FileText size={24} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                                            {bill.date_introduced}
                                        </p>
                                        <h3 className="text-base font-bold text-slate-900 leading-snug tracking-tight line-clamp-2 group-hover:text-violet-600 transition-colors">
                                            {bill.title}
                                        </h3>
                                        <div className="mt-3">
                                            <Badge variant={bill.status === 'Passed' ? 'success' : 'warning'}>
                                                {bill.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Database Connect placeholder */}
                    <label className="group relative cursor-pointer">
                        <input type="file" className="hidden" accept=".json,.csv,.sql" onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) alert(`Connecting to ${file.name}... Database sync in progress.`);
                        }} />
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                        <div className="relative h-full min-h-[140px] flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-violet-200 bg-violet-50/30 hover:bg-violet-50 hover:border-violet-400 transition-all duration-300">
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-violet-400 mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                <Plus size={24} />
                            </div>
                            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest">Connect Database</p>
                        </div>
                    </label>
                </div>

                {/* Compare Button */}
                <div className="flex flex-col items-center gap-6 mb-16 animate-slide-up animate-delay-300">
                    <Button
                        onClick={handleCompare}
                        disabled={selectedIds.length !== 2 || loading}
                        variant={selectedIds.length === 2 ? 'accent' : 'ghost'}
                        className={`h-16 px-14 rounded-2xl font-bold text-lg gap-3 transition-all ${selectedIds.length === 2 ? 'hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/25 hover:shadow-2xl hover:shadow-orange-500/30' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                    >
                        {loading ? <RefreshCw className="animate-spin" size={22} /> : <Zap size={22} strokeWidth={2.5} fill="currentColor" />}
                        {loading ? "Analyzing Differences..." : "Run Deep Comparison"}
                    </Button>
                    
                    {selectedIds.length < 2 && (
                        <p className="text-xs text-slate-500 font-medium">
                            Select {2 - selectedIds.length} more bill{2 - selectedIds.length > 1 ? 's' : ''} to compare
                        </p>
                    )}
                </div>

                {/* Comparison Result Section */}
                {comparison && (
                    <div className="space-y-10 animate-slide-up">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/25">
                                <Layers size={22} />
                            </div>
                            <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight">Comparison Results</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Summary Quote */}
                            <div className="lg:col-span-7 relative overflow-hidden rounded-3xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600"></div>
                                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-2xl"></div>
                                <div className="relative z-10 p-10">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <AlertTriangle size={120} className="text-white" />
                                    </div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <TrendingUp size={16} className="text-amber-300" />
                                        <p className="text-xs font-bold text-white/80 uppercase tracking-widest">Evolutionary Summary</p>
                                    </div>
                                    <blockquote className="text-2xl font-bold text-white leading-[1.5] mb-8 tracking-tight">
                                        "{comparison.comparison_summary}"
                                    </blockquote>
                                    <div className="flex items-center gap-4 pt-6 border-t border-white/20">
                                        <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-2 rounded-xl">
                                            <Check size={14} strokeWidth={3} />
                                            Integrity Verified
                                        </div>
                                        <div className="flex items-center gap-2 text-white/70 font-bold text-xs uppercase tracking-widest">
                                            <Scale size={14} />
                                            2 Bills Compared
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Diff Viewer */}
                            <div className="lg:col-span-5 space-y-5">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <ArrowRight size={14} className="text-violet-600" />
                                        Key Differences
                                    </span>
                                    <Badge variant="warning">Delta Map</Badge>
                                </h3>
                                <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-violet-100/50 divide-y divide-violet-50 overflow-hidden shadow-xl">
                                    {comparison.key_differences.map((diff, i) => (
                                        <div key={i} className="p-5 hover:bg-violet-50/50 transition-all duration-300 flex gap-4 group">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800 leading-snug group-hover:text-violet-600 transition-colors">
                                                    {diff}
                                                </p>
                                                <div className="mt-2 flex items-center gap-2 text-xs font-bold text-violet-500 uppercase tracking-widest group-hover:text-violet-600 transition-colors cursor-pointer">
                                                    Deep Analysis <ArrowRight size={10} strokeWidth={3} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompareBills;
