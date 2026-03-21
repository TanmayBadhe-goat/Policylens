import React, { useEffect, useState } from 'react';
import useBillStore from '../store/useBillStore';
import { billService } from '../services/billService';
import BillCard from '../components/dashboard/BillCard';
import { Database, Plus } from 'lucide-react';

const Dashboard = () => {
    const { bills, setBills, loading, setLoading, setSummaryResult, error, setError } = useBillStore();
    const [uploading, setUploading] = useState(false);
    const [isSlowLoading, setIsSlowLoading] = useState(false);

    useEffect(() => {
        let timeout;
        if (loading) {
            timeout = setTimeout(() => {
                setIsSlowLoading(true);
            }, 3000);
        } else {
            setIsSlowLoading(false);
        }
        return () => clearTimeout(timeout);
    }, [loading]);

    useEffect(() => {
        const fetchBills = async () => {
            setLoading(true);
            try {
                if (setError) setError(null);
                const data = await billService.getBills();
                setBills(data);
            } catch (err) {
                console.error(err);
                if (setError) setError("Failed to load bills. The server might be unreachable or timing out. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchBills();
    }, [setBills, setLoading, setError]);

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
        <div className="p-8 min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Civic Dashboard</h1>
                    <p className="text-slate-600 text-lg">Upload a bill PDF to generate a citizen summary.</p>
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-slate-800 text-white rounded flex items-center justify-center">
                        <Database size={20} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Legislative Queue</h2>
                        <p className="text-sm text-slate-500">Compressed & ready for analysis</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white border-2 border-slate-200 rounded-xl px-6 text-center">
                        <div className="text-slate-500 text-lg font-bold mb-4">
                            {isSlowLoading ? "Waking up the backend... This might take up to a minute on the free tier." : "Loading Data..."}
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white border-2 border-red-200 rounded-xl text-center px-6">
                        <div className="text-red-600 text-xl font-bold mb-2">Connection Error</div>
                        <p className="text-slate-600 mb-6">{error}</p>
                        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 font-medium transition-colors">
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {bills.map((bill) => (
                            <BillCard key={bill.id} bill={bill} />
                        ))}

                        <label className="cursor-pointer">
                            <div className="h-full min-h-[250px] bg-white border-4 border-dashed border-slate-300 hover:border-blue-400 hover:bg-slate-50 rounded-xl flex flex-col items-center justify-center text-center transition-colors">
                                <div className="w-14 h-14 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mb-4">
                                    <Plus size={30} />
                                </div>
                                <h3 className="font-bold text-slate-800 mb-2 text-lg">Upload New Bill</h3>
                                <p className="text-sm text-slate-500">Drop PDF or click to browse</p>
                            </div>
                            <input type="file" className="hidden" accept="application/pdf" onChange={handleFileUpload} disabled={uploading} />
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
