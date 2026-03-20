import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useBillStore from '../store/useBillStore';
import { billService } from '../services/billService';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
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

    const isDemo = typeof displaySummary === 'string' && (displaySummary.includes('demo mode') || displaySummary.includes('Mocked LLM Response'));

    const generatedBullets = isDemo ? [
        { title: 'Your Rights', text: "You have the right to access, correct, and erase your personal data held by any company or Data Fiduciary.", color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Your Obligations', text: "You must provide accurate information when consenting to data processing. Filing false grievances can incur penalties.", color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: 'Penalties', text: "Companies face fines up to ₹250 crore for data breaches. Non-compliance with consent norms carries significant penalties.", color: 'text-red-600', bg: 'bg-red-50' },
        { title: 'Who Is Affected', text: "Every citizen whose personal data is processed digitally — including all app users, online shoppers, and social media users.", color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Government Powers', text: "Government can exempt any agency from the Act citing national security. Data Processing Board adjudicates complaints.", color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ].map((b) => ({ ...b, icon: FileText })) : [
        { title: 'Your Rights', text: summarySentences[0] || 'No data yet.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Your Obligations', text: summarySentences[1] || summarySentences[0] || 'No data yet.', color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: 'Penalties', text: summarySentences[2] || summarySentences[1] || summarySentences[0] || 'No data yet.', color: 'text-red-600', bg: 'bg-red-50' },
        { title: 'Who Is Affected', text: summarySentences[3] || summarySentences[2] || summarySentences[0] || 'No data yet.', color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Government Powers', text: summarySentences[4] || summarySentences[3] || summarySentences[1] || 'No data yet.', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ].map((b) => ({ ...b, icon: FileText }));

    const generatedComparisons = isDemo ? [
        { legal: "Data Fiduciary shall process personal data for lawful purposes only and shall obtain consent of the Data Principal before processing.", simple: "Companies can only use your data legally and must ask your permission first." },
        { legal: "The Data Principal shall have the right to nominate any other individual who shall exercise the rights of the Data Principal in the event of death or incapacity.", simple: "You can choose someone to manage your data rights if you pass away or become unable to do so." },
        { legal: "Notwithstanding anything contained in sub-section (1), the Central Government may, by notification, exempt any instrumentality of the State from the provisions of this Act.", simple: "The government can exempt its own agencies from following this law for security reasons." }
    ] : [0, 1, 2].map((idx) => {
        const legal = (rawSections[idx] || rawSections[0] || '').slice(0, 220) || 'No raw text available.';
        const simple = summarySentences[idx] || summarySentences[0] || 'No simplified summary available.';
        return { legal, simple };
    });

    const generatedGroups = isDemo ? [
        { label: 'Students', impacts: ["EdTech platforms must get parental consent for minors under 18", "Right to erase your data from educational apps", "Schools cannot share student data without explicit consent"] },
        { label: 'Small Businesses', impacts: ["Must appoint a Data Protection Officer if processing significant data", "Penalties can go up to ₹250 crore for data breaches", "Simplified compliance framework for startups"] },
        { label: 'Startups', impacts: ["Consent-based data collection increases compliance burden", "Cross-border data transfer now regulated", "Exemptions available for early-stage research and innovation"] },
        { label: 'Employees', impacts: ["Employers must disclose what employee data they collect", "Workplace surveillance tools need explicit consent", "Right to correct personal data held by employer"] },
        { label: 'Social Media Users', impacts: ["Platforms must provide option to delete account and all data", "Targeted advertising requires your consent", "You can request a copy of all data a platform holds about you"] },
    ].map(g => ({ ...g, icon: TrendingUp })) : [
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
        <div className="p-8 min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto">
                {/* Navigation */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/dashboard">
                        <Button variant="ghost" className="gap-2 text-slate-600 font-bold uppercase text-xs">
                            <ArrowLeft size={16} />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <button onClick={handleSave} className="w-10 h-10 flex items-center justify-center rounded bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors"><Bookmark size={18} /></button>
                        <button onClick={handleShare} className="w-10 h-10 flex items-center justify-center rounded bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors"><Share2 size={18} /></button>
                        <Button onClick={handleExportBrief} variant="primary" className="h-10 px-4 flex items-center gap-2 text-sm">
                            <Download size={16} />
                            Export Brief
                        </Button>
                    </div>
                </div>

                {/* Hero Info */}
                <div className="mb-10 border-b border-slate-300 pb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Badge variant="primary" className="bg-blue-100 text-blue-800">Semantic Layer Active</Badge>
                        <span className="text-xs font-bold text-slate-500 uppercase">Ref: IN-2023-BILL-08</span>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">
                        {selectedBill?.title || summaryResult?.title || "Legislative Intelligence Analysis"}
                    </h1>
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded text-xs font-bold uppercase">
                            <CheckCircle2 size={14} /> Final Synthesis
                        </div>
                        <div className="flex items-center gap-2 bg-slate-200 text-slate-700 px-3 py-1.5 rounded text-xs font-bold uppercase">
                            <Cpu size={14} /> PolicyLens v2.4
                        </div>
                        <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded text-xs font-bold uppercase">
                            <Leaf size={14} /> 82% Optimization
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
                            <Clock size={14} /> Processed 2 min ago
                        </div>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Summary Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-sm font-bold text-slate-800 uppercase mb-4 flex items-center gap-2">
                                <FileText size={18} className="text-blue-600" /> Executive Summary
                            </h2>

                            <div className="bg-white border-2 border-slate-200 rounded-xl p-8">
                                <div className="text-slate-800 leading-relaxed text-base font-medium space-y-6">
                                    {(displaySummary || 'No summary available.').split('\n\n').map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="px-2 py-1 bg-slate-800 text-white rounded text-xs font-bold">AI</div>
                                        <span className="text-xs font-bold text-slate-500 uppercase">Semantic Consensus</span>
                                    </div>
                                    <button onClick={() => setRawOpen((v) => !v)} className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase hover:underline">
                                        Explore Raw Sections <ChevronDown size={14} />
                                    </button>
                                </div>
                            </div>

                            {rawOpen && (
                                <div className="mt-4 bg-slate-100 border-2 border-slate-200 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-300">
                                        <p className="text-xs font-bold text-slate-800 uppercase">Raw Sections</p>
                                        <button onClick={() => setRawOpen(false)} className="text-xs font-bold text-red-600 hover:underline hover:bg-slate-200 px-2 rounded">Close</button>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto space-y-4">
                                        {(rawSections.length ? rawSections : ['No raw sections available for this document.']).map((section, idx) => (
                                            <div key={idx} className="bg-white p-4 border border-slate-200 rounded">
                                                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Section {idx + 1}</p>
                                                <p className="text-sm text-slate-700">{section}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Impact Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-blue-600 text-white rounded-xl p-6 shadow-sm border-2 border-blue-700">
                                <h4 className="text-sm font-bold uppercase mb-4 flex items-center gap-2 text-blue-100">
                                    <Shield size={16} /> Citizen Impact
                                </h4>
                                <ul className="space-y-3">
                                    {['Automated data consent management', 'Right to erasure implemented', 'Simplified grievance redressal'].map(txt => (
                                        <li key={txt} className="flex gap-2 items-start font-medium text-sm">
                                            <CheckCircle2 size={16} className="text-blue-300 flex-shrink-0 mt-0.5" />
                                            {txt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white rounded-xl p-6 border-2 border-slate-200 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-800 uppercase mb-4 flex items-center gap-2">
                                    <TrendingUp size={16} className="text-blue-600" /> Global Context
                                </h3>
                                <p className="text-sm font-medium text-slate-700 mb-4">
                                    This bill aligns with the EU General Data Protection Regulation (GDPR) standards for high-density digital economies.
                                </p>
                                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                                    <div className="bg-orange-500 h-2 rounded-full w-2/3"></div>
                                </div>
                                <p className="text-xs font-bold text-slate-500">67% GDPR Alignment Score</p>
                            </div>
                        </div>
                    </div>

                    {/* Metrics Column */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-slate-800 uppercase flex items-center gap-2">
                            <Activity size={18} className="text-blue-600" /> Compression Engine
                        </h3>

                        {displayMetrics && (
                            <div className="space-y-4">
                                <div className="bg-white p-6 rounded-xl border-2 border-slate-200 shadow-sm">
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-2">Original State</p>
                                    <p className="text-3xl font-bold text-slate-900 mb-4">{displayMetrics.original_tokens.toLocaleString()} <span className="text-sm text-slate-500">tokens</span></p>
                                    <ProgressBar value={100} color="slate" />
                                </div>

                                <div className="bg-slate-800 p-6 rounded-xl text-white shadow-sm border-2 border-slate-900">
                                    <p className="text-xs font-bold text-slate-300 uppercase mb-2 flex justify-between">
                                        PolicyLens Synthesis <Zap size={14} className="text-blue-400" />
                                    </p>
                                    <p className="text-3xl font-bold mb-4">{(displayMetrics.after_local_compression / 1000).toFixed(1)}k <span className="text-sm text-slate-400">tokens</span></p>
                                    <ProgressBar value={(displayMetrics.after_local_compression / displayMetrics.original_tokens) * 100} color="blue" />
                                </div>

                                <div className="bg-emerald-600 p-6 rounded-xl text-white shadow-sm border-2 border-emerald-700">
                                    <p className="text-xs font-bold text-emerald-100 uppercase mb-2">Summary Efficiency</p>
                                    <p className="text-4xl font-bold mb-4">{displayMetrics.compression_rate}</p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-100 border-t border-emerald-500 pt-4">
                                        <Leaf size={14} /> Net-Positive UI
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl border-2 border-slate-200 shadow-sm flex items-center justify-between">
                                    <div>
                                        <p className="text-xl font-bold text-slate-900">82.5g</p>
                                        <p className="text-xs font-bold text-slate-500 uppercase">CO2 Optim.</p>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200"></div>
                                    <div>
                                        <p className="text-xl font-bold text-slate-900">0.14kWh</p>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Energy Delta</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Components */}
                <div className="mt-12 space-y-8 pb-12">
                    <div className="bg-white rounded-xl p-8 border-2 border-slate-200 shadow-sm">
                        <BulletSummary 
                            bullets={generatedBullets}
                            title="5-Bullet Citizen Summary" 
                            subtitle="Generated from your uploaded document"
                        />
                    </div>

                    <div className="bg-white rounded-xl p-8 border-2 border-slate-200 shadow-sm">
                        <ExplainSimple comparisons={generatedComparisons} />
                    </div>

                    <div className="bg-white rounded-xl p-8 border-2 border-slate-200 shadow-sm">
                        <ImpactView groups={generatedGroups} />
                    </div>

                    <div className="bg-white rounded-xl p-8 border-2 border-slate-200 shadow-sm">
                        <TokenSavings metrics={displayMetrics} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillDetails;
