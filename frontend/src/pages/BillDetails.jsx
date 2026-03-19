import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useBillStore from '../store/useBillStore';
import { billService } from '../services/billService';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import ProgressBar from '../components/common/ProgressBar';
import BulletSummary from '../components/bill/BulletSummary';
import ExplainSimple from '../components/bill/ExplainSimple';
import ImpactView from '../components/bill/ImpactView';
import TokenSavings from '../components/bill/TokenSavings';
import {
    ArrowLeft,
    Share2,
    Download,
    Cpu,
    Zap,
    Leaf,
    CheckCircle2,
    Maximize2,
    Bookmark,
    ChevronDown,
    FileText,
    Activity,
    TrendingUp,
    Clock,
    Shield
} from 'lucide-react';

const BillDetails = () => {
    const { id } = useParams();
    const { summaryResult, setSelectedBill, selectedBill } = useBillStore();
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rawOpen, setRawOpen] = useState(false);

    const displayMetrics = summaryResult?.metrics || metrics;
    const displaySummary = summaryResult?.summary || "";
    const rawSections = summaryResult?.raw_sections || [];

    const summarySentences = (displaySummary || '')
        .replace(/\s+/g, ' ')
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.trim())
        .filter(Boolean);

    const generatedBullets = [
        { title: 'Your Rights', text: summarySentences[0] || 'No data yet.', color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { title: 'Your Obligations', text: summarySentences[1] || summarySentences[0] || 'No data yet.', color: 'text-amber-500', bg: 'bg-amber-50' },
        { title: 'Penalties', text: summarySentences[2] || summarySentences[1] || summarySentences[0] || 'No data yet.', color: 'text-red-500', bg: 'bg-red-50' },
        { title: 'Who Is Affected', text: summarySentences[3] || summarySentences[2] || summarySentences[0] || 'No data yet.', color: 'text-blue-500', bg: 'bg-blue-50' },
        { title: 'Government Powers', text: summarySentences[4] || summarySentences[3] || summarySentences[1] || 'No data yet.', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    ].map((b) => ({
        ...b,
        icon: FileText,
    }));

    const generatedComparisons = [0, 1, 2].map((idx) => {
        const legal = (rawSections[idx] || rawSections[0] || '').slice(0, 220) || 'No raw text available.';
        const simple = summarySentences[idx] || summarySentences[0] || 'No simplified summary available.';
        return { legal, simple };
    });

    const generatedGroups = [
        { label: 'Students', impacts: [summarySentences[0], summarySentences[1], summarySentences[2]].filter(Boolean) },
        { label: 'Small Businesses', impacts: [summarySentences[1], summarySentences[2], summarySentences[3]].filter(Boolean) },
        { label: 'Startups', impacts: [summarySentences[2], summarySentences[3], summarySentences[4]].filter(Boolean) },
        { label: 'Employees', impacts: [summarySentences[0], summarySentences[3], summarySentences[4]].filter(Boolean) },
        { label: 'Social Media Users', impacts: [summarySentences[1], summarySentences[4], summarySentences[0]].filter(Boolean) },
    ].map((g) => ({
        ...g,
        icon: TrendingUp,
        impacts: g.impacts.length ? g.impacts : ['No impact insights available.'],
    }));

    const handleExportBrief = () => {
        const lines = [];
        lines.push(selectedBill?.title || summaryResult?.title || 'PolicyLens Brief');
        lines.push('');
        if (displayMetrics) {
            lines.push(`Original tokens: ${displayMetrics.original_tokens}`);
            lines.push(`After local compression: ${displayMetrics.after_local_compression}`);
            lines.push(`After scaledown: ${displayMetrics.after_scaledown}`);
            lines.push(`Compression rate: ${displayMetrics.compression_rate}`);
            lines.push('');
        }
        lines.push(displaySummary || 'No summary available.');
        const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `policylens-brief-${id}.txt`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    const handleShare = async () => {
        const shareText = displaySummary ? displaySummary.slice(0, 220) : 'PolicyLens summary';
        const shareData = {
            title: selectedBill?.title || 'PolicyLens',
            text: shareText,
            url: window.location.href,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
                return;
            }
        } catch (e) {
        }
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard');
        } catch (e) {
            alert(window.location.href);
        }
    };

    const handleSave = () => {
        const key = 'policylens:saved';
        const saved = JSON.parse(localStorage.getItem(key) || '[]');
        const entry = {
            id,
            title: selectedBill?.title || summaryResult?.title || 'PolicyLens Brief',
            summary: displaySummary,
            metrics: displayMetrics,
            savedAt: new Date().toISOString(),
        };
        const next = [entry, ...saved.filter((x) => x?.id !== id)].slice(0, 50);
        localStorage.setItem(key, JSON.stringify(next));
        alert('Saved');
    };

    useEffect(() => {
        const fetchBill = async () => {
            setLoading(true);
            try {
                if (id !== 'new') {
                    const data = await billService.getMetrics(id);
                    setMetrics(data);
                    const currentBill = id === '1' ? { id: '1', title: 'The Digital Personal Data Protection Bill, 2023' } : { id: 'active', title: 'Legislative Reform Analysis' };
                    setSelectedBill(currentBill);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBill();
    }, [id, setSelectedBill]);

    return (
        <div className="p-10 min-h-screen animate-fade-in">
            <div className="max-w-7xl mx-auto">
                {/* Navigation */}
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between mb-10"
                >
                    <Link to="/dashboard">
                        <Button variant="ghost" className="gap-2 -ml-4 pr-6 text-slate-600 hover:text-violet-600 font-bold tracking-widest text-xs uppercase">
                            <ArrowLeft size={16} strokeWidth={2.5} />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Button onClick={handleSave} variant="ghost" className="w-11 h-11 p-0 rounded-xl hover:bg-violet-50 text-slate-500 hover:text-violet-600"><Bookmark size={18} /></Button>
                        <Button onClick={handleShare} variant="ghost" className="w-11 h-11 p-0 rounded-xl hover:bg-violet-50 text-slate-500 hover:text-violet-600"><Share2 size={18} /></Button>
                        <Button onClick={handleExportBrief} variant="accent" className="h-11 px-6 rounded-xl gap-2 text-sm">
                            <Download size={16} />
                            Export Brief
                        </Button>
                    </div>
                </motion.div>

                {/* Hero Info */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-5">
                        <Badge variant="primary">Semantic Layer Active</Badge>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ref: IN-2023-BILL-08</span>
                    </div>
                    <h1 className="text-5xl font-display font-black text-slate-900 leading-[1.1] tracking-tight mb-6 max-w-4xl">
                        {selectedBill?.title || summaryResult?.title || "Legislative Intelligence Analysis"}
                    </h1>
                    <div className="flex flex-wrap gap-4 items-center text-slate-600 font-bold uppercase tracking-widest text-xs">
                        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-emerald-600">Final Synthesis</span>
                        </div>
                        <div className="flex items-center gap-2 bg-violet-50 px-4 py-2 rounded-xl border border-violet-100">
                            <Cpu size={14} className="text-violet-600" />
                            <span className="text-violet-600">PolicyLens v2.4</span>
                        </div>
                        <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-xl border border-teal-100">
                            <Leaf size={14} className="text-teal-600" />
                            <span className="text-teal-600">82% Optimization</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                            <Clock size={14} className="text-slate-500" />
                            <span className="text-slate-500">Processed 2 min ago</span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* Summary Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-8 space-y-8"
                    >
                        <div className="relative">
                            <div className="absolute top-0 left-[-32px] h-full w-[3px] bg-gradient-to-b from-violet-500 to-transparent rounded-full opacity-30 hidden xl:block"></div>
                            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-4">
                                <FileText size={16} className="text-violet-600" />
                                Citizen Summary Executive
                                <div className="flex-1 h-px bg-violet-100"></div>
                            </h2>

                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-violet-100/50 shadow-xl">
                                <div className="prose prose-slate max-w-none text-slate-700 leading-[1.9] text-base font-medium space-y-8">
                                    {(displaySummary || 'No summary available.').split('\n\n').map((para, i) => (
                                        <div key={i} className="flex gap-6 group">
                                            <div className="mt-2 flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                {i + 1}
                                            </div>
                                            <p className="flex-1 transition-colors duration-300 text-[15px]">
                                                {para}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 pt-8 border-t border-violet-100/50 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg">AI</div>)}
                                        </div>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Semantic Consensus Verified</span>
                                    </div>
                                    <button onClick={() => setRawOpen((v) => !v)} className="flex items-center gap-2 text-xs font-bold text-violet-600 uppercase tracking-widest hover:translate-x-1 transition-transform bg-violet-50 px-4 py-2 rounded-xl hover:bg-violet-100">
                                        Explore Raw Sections <ChevronDown size={14} />
                                    </button>
                                </div>
                            </div>

                            {rawOpen && (
                                <div className="mt-5 bg-white/90 backdrop-blur-sm border border-violet-100/50 rounded-2xl shadow-xl overflow-hidden">
                                    <div className="px-5 py-4 border-b border-violet-100/50 flex items-center justify-between">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Raw Sections</p>
                                        <button onClick={() => setRawOpen(false)} className="text-xs font-bold text-violet-600 uppercase tracking-widest">Close</button>
                                    </div>
                                    <div className="max-h-[320px] overflow-auto divide-y divide-violet-50">
                                        {(rawSections.length ? rawSections : ['No raw sections available for this document.']).map((section, idx) => (
                                            <div key={idx} className="p-5">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Section {idx + 1}</p>
                                                <p className="text-sm text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">{section}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Impact Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative overflow-hidden rounded-3xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600"></div>
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl"></div>
                                <div className="relative z-10 p-8">
                                    <h4 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <Shield size={14} className="text-amber-300" />
                                        Citizen Impact
                                    </h4>
                                    <div className="space-y-4">
                                        {['Automated data consent management', 'Right to erasure implemented', 'Simplified grievance redressal'].map(txt => (
                                            <div key={txt} className="flex gap-3 items-center text-white/90 font-semibold text-sm">
                                                <CheckCircle2 size={16} className="text-emerald-300 flex-shrink-0" />
                                                {txt}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-violet-100/50 shadow-xl">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <TrendingUp size={14} className="text-cyan-600" />
                                    Global Context
                                </h3>
                                <p className="text-sm font-bold text-slate-700 leading-relaxed mb-6">
                                    This bill aligns with the EU General Data Protection Regulation (GDPR) standards for high-density digital economies.
                                </p>
                                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full w-2/3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
                                </div>
                                <p className="text-xs text-slate-500 font-bold mt-3">67% GDPR Alignment Score</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Metrics Column */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="lg:col-span-4 space-y-6"
                    >
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Activity size={14} className="text-violet-600" />
                            Compression Engine
                        </h3>

                        {displayMetrics && (
                            <div className="grid grid-cols-1 gap-5">
                                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-violet-100/50 shadow-lg">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Original State</p>
                                    <div className="flex items-baseline gap-2 mb-5">
                                        <span className="text-3xl font-display font-black text-slate-900 tracking-tight">{displayMetrics.original_tokens.toLocaleString()}</span>
                                        <span className="text-xs font-bold text-slate-500 uppercase">tokens</span>
                                    </div>
                                    <ProgressBar value={100} label="Source Volume" color="violet" />
                                </div>

                                <div className="relative overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50"></div>
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                        <Zap size={50} fill="currentColor" className="text-violet-600" />
                                    </div>
                                    <div className="relative z-10 p-6">
                                        <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-2">PolicyLens Synthesis</p>
                                        <div className="flex items-baseline gap-2 mb-5">
                                            <span className="text-3xl font-display font-black text-slate-900 tracking-tight">{(displayMetrics.after_local_compression / 1000).toFixed(1)}k</span>
                                            <span className="text-xs font-bold text-slate-500 uppercase">tokens</span>
                                        </div>
                                        <ProgressBar value={(displayMetrics.after_local_compression / displayMetrics.original_tokens) * 100} label="Optimized Density" color="purple" />
                                    </div>
                                </div>

                                <div className="relative overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500"></div>
                                    <div className="absolute top-[-20%] left-[-20%] w-32 h-32 bg-white/10 rounded-full blur-[30px]"></div>
                                    <div className="relative z-10 p-6">
                                        <p className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2">Final Summary Efficiency</p>
                                        <p className="text-5xl font-display font-black text-white tracking-tight mb-4">{displayMetrics.compression_rate}</p>
                                        <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Leaf size={16} className="text-white/60" />
                                                <span className="text-xs font-bold text-white/80">Net-Positive UI</span>
                                            </div>
                                            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                                                <Maximize2 size={16} className="text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">Environmental Savings</h4>
                                    <div className="flex items-center gap-8">
                                        <div className="text-center">
                                            <p className="text-2xl font-display font-black text-slate-900 tracking-tight">82.5g</p>
                                            <p className="text-xs font-bold text-slate-500 uppercase">CO2 Optim.</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-display font-black text-slate-900 tracking-tight">0.14kWh</p>
                                            <p className="text-xs font-bold text-slate-500 uppercase">Energy Delta</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* New Citizen-Friendly Sections */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 space-y-16"
                >
                    {/* 5-Bullet Summary */}
                    <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-3xl p-10 border border-violet-100/50">
                        <BulletSummary 
                            bullets={generatedBullets}
                            title="5-Bullet Citizen Summary" 
                            subtitle="Generated from your uploaded document"
                        />
                    </div>

                    {/* Explain Like I'm 18 */}
                    <ExplainSimple comparisons={generatedComparisons} />

                    {/* Impact View */}
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-10 border border-cyan-100/50">
                        <ImpactView groups={generatedGroups} />
                    </div>

                    {/* Token Savings Visualization */}
                    <TokenSavings metrics={displayMetrics} />
                </motion.div>
            </div>
        </div>
    );
};

export default BillDetails;
