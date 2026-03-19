import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useBillStore from '../store/useBillStore';
import { billService } from '../services/billService';
import BillCard from '../components/dashboard/BillCard';
import Button from '../components/common/Button';
import {
    Plus,
    Loader2,
    Database,
    Upload,
} from 'lucide-react';

const Dashboard = () => {
    const { bills, setBills, loading, setLoading, setSummaryResult } = useBillStore();
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchBills = async () => {
            setLoading(true);
            try {
                const data = await billService.getBills();
                setBills(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBills();
    }, [setBills, setLoading]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const result = await billService.summarizeBill(file);
            setSummaryResult(result);
            window.location.hash = '#/bill/new';
        } catch (err) {
            alert("Pipeline Error: Failed to process document.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-10 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12"
                >
                    <div>
                        <h1 className="text-5xl font-display font-black text-slate-900 tracking-tight mb-3">Civic Dashboard</h1>
                        <p className="text-slate-600 font-medium text-lg">Upload a bill PDF to generate a citizen summary.</p>
                    </div>
                </motion.div>

                {/* Main Content Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-8"
                >
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow">
                                <Database size={22} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Legislative Queue</h2>
                                <p className="text-sm text-slate-500 font-medium">Compressed & ready for analysis</p>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
                            <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-700 rounded-full animate-spin mb-6"></div>
                            <p className="font-bold text-xs text-slate-500 uppercase tracking-[0.3em]">Loading Legislative Data</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {bills.map((bill) => (
                                <BillCard key={bill.id} bill={bill} />
                            ))}

                            {/* Upload Card */}
                            <label className="cursor-pointer group">
                                <div className="relative h-full min-h-[300px]">
                                    <div className="relative bg-white border-2 border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center group-hover:border-slate-400 group-hover:shadow-md transition-all duration-200 h-full">
                                        <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 mb-6 group-hover:bg-slate-200 transition-colors shadow-sm">
                                            <Plus size={32} strokeWidth={2} />
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-slate-900 mb-2">Upload New Bill</h3>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[200px] mb-4">
                                            Drop PDF or click to browse
                                        </p>
                                    </div>
                                </div>
                                <input type="file" className="hidden" accept="application/pdf" onChange={handleFileUpload} disabled={uploading} />
                            </label>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
